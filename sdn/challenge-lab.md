# Challenge Lab Submission

Damitha Gunawardena
damitha.n.gunawardena@team.telstra.com

# Topology

The following is the topology

![Topology](https://morphkurt.github.io/sdn/Drawing1.png)

# Setting up the Mininet VMs

## Create the Mininet VM

![Oracle VM VirtualBox Manager](https://morphkurt.github.io/sdn/Image1.PNG)

Create two different VM.

## Configure each Mininet VM

### Changing the Hostname

To ensure that we don't mix up the server go and change the hostname

```bash
# On server 1
sudo su
echo "mininet-vm1 > /etc/hostname"

# On server 2
sudo su
echo "mininet-vm2 > /etc/hostname"
```

You will realise the server will complain about the DNS. Fix that with adding an entry on `/etc/hosts`


### Configure the secondary interface

```bash
vi /etc/network/interfaces

# Add the following configuration lines to the second interface on the VM1

auto eth1
iface eth1 inet static
  address 210.20.20.11
  netmask 255.255.255.0
  gateway 210.20.20.10
  
# Add the following configuration lines to the second interface on the VM2

auto eth1
iface eth1 inet static
  address 210.10.10.11
  netmask 255.255.255.0
  gateway 210.10.10.10

```

## Setting up the Router

As the DSL was not available, use the Ubuntu as the router

Login to the newly created Ubuntu VM and run the following command.

```bash
sudo sh -c "echo1 > /proc/sys/net/ipv4/ip_forward"
```

## Creating the Mininet Topology

The following python script was used to create the Mininet Topology

### Virtual Server 1

Create vxlan1.py file with following content

```python
#!/usr/bin/python
from mininet.net import Mininet
from mininet.node import Controller
from mininet.cli import CLI
from mininet.log import setLogLevel, info

def emptyNet():
      net = Mininet( controller=None )
    info( '*** Adding controller\n' )
    info( '*** Adding hosts\n' )
    h1 = net.addHost( 'h1', ip='10.0.0.1', mac='00:00:00:00:00:01' )
    info( '*** Adding switch\n' )
    s1 = net.addSwitch( 's1' )
    info( '*** Creating links\n' )
    net.addLink( h1, s1 )
    info( '*** Starting network\n')
    net.start()
    info( '*** Running CLI\n' )
    CLI( net )
    info( '*** Stopping network' )
    net.stop()

if __name__ == '__main__':
  setLogLevel( 'info' )
  emptyNet()
```


### Virtual Server 2

Create vxlan2.py file with following content

```python
#!/usr/bin/python
from mininet.net import Mininet
from mininet.node import Controller
from mininet.cli import CLI
from mininet.log import setLogLevel, info

def emptyNet():
      net = Mininet( controller=None )
    info( '*** Adding controller\n' )
    info( '*** Adding hosts\n' )
    h3 = net.addHost( 'h3', ip='10.0.0.2',mac='00:00:00:00:00:02' )
    info( '*** Adding switch\n' )
    s2 = net.addSwitch( 's2' )
    info( '*** Creating links\n' )
    net.addLink( h3, s2 )
    info( '*** Starting network\n')
    net.start()
    info( '*** Running CLI\n' )
    CLI( net )
    info( '*** Stopping network' )
    net.stop()

if __name__ == '__main__':
  setLogLevel( 'info' )
  emptyNet()
```

### Start the mininet

On Virtual server 1 start the mininet with following command

```bash
sudo python vxlan1.py
```

On Virtual server 1 start the mininet with following command

```bash
sudo python vxlan2.py
```

### Create the VTEP Tunnel

On server 1

```bash
sh ovs-vsctl add-port s1 vtep -- set interface vtep type=vxlan option:remote_ip=210.10.10.11 option:key=flow ofport_request=10 
```

On server 2

```bash
sh ovs-vsctl add-port s2 vtep -- set interface vtep type=vxlan option:remote_ip=210.20.20.11 option:key=flow ofport_request=10 
```

### Create the Flow Table

Create a flows.txt file with following content on each server

On the server 1
```bash
table=0,in_port=1,actions=set_field:100->tun_id,resubmit(,1)
table=0,in_port=2,actions=set_field:200->tun_id,resubmit(,1)
table=0,actions=resubmit(,1)

table=1,tun_id=100,dl_dst=00:00:00:00:00:01,actions=output:1
table=1,tun_id=200,dl_dst=00:00:00:00:00:01,actions=output:2
table=1,tun_id=100,dl_dst=00:00:00:00:00:02,actions=output:10
table=1,tun_id=200,dl_dst=00:00:00:00:00:02,actions=output:10
table=1,tun_id=100,arp,nw_dst=10.0.0.1,actions=output:1
table=1,tun_id=200,arp,nw_dst=10.0.0.1,actions=output:2
table=1,tun_id=100,arp,nw_dst=10.0.0.3,actions=output:10
table=1,tun_id=200,arp,nw_dst=10.0.0.3,actions=output:10 
table=1,priority=100,actions=drop 
```

On the server 2
```bash
table=0,in_port=1,actions=set_field:100->tun_id,resubmit(,1)
table=0,in_port=2,actions=set_field:200->tun_id,resubmit(,1)
table=0,actions=resubmit(,1)

table=1,tun_id=100,dl_dst=00:00:00:00:00:02,actions=output:1
table=1,tun_id=200,dl_dst=00:00:00:00:00:02,actions=output:2
table=1,tun_id=100,dl_dst=00:00:00:00:00:01,actions=output:10
table=1,tun_id=200,dl_dst=00:00:00:00:00:01,actions=output:10
table=1,tun_id=100,arp,nw_dst=10.0.0.3,actions=output:1
table=1,tun_id=200,arp,nw_dst=10.0.0.3,actions=output:2
table=1,tun_id=100,arp,nw_dst=10.0.0.1,actions=output:10
table=1,tun_id=200,arp,nw_dst=10.0.0.1,actions=output:10 
table=1,priority=100,actions=drop 
```

### Load the flow table

Run the following command on the both servers

server 1

```bash
sh ovs-ofctl add-flows s1 flows.txt
```

server 2

```bash
sh ovs-ofctl add-flows s2 flows.txt
```


### Test the VXLAN 

On server 1

```bash
mininet> h1 ping 10.0.0.3
```

On server 2

```bash
mininet> h3 ping 10.0.0.1
```

![Testintg the VXLAN](https://morphkurt.github.io/sdn/Image2.PNG)

You will see the succesfull pings

### Sample tcpdump traffic

Login to the router and run the following command

```bash
sudo tcpdump -ani any not port 22
```

![Testing the VXLAN](https://morphkurt.github.io/sdn/Image3.PNG)


