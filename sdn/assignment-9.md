# Challenge Lab Submission

Damitha Gunawardena
damitha.n.gunawardena@team.telstra.com

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
    h1 = net.addHost( 'h1', ip='10.0.0.1' )
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
    h3 = net.addHost( 'h3', ip='10.0.0.2' )
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

