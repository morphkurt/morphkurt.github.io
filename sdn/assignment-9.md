# Assignment 9

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
  address 210.10.10.11
  netmask 255.255.255.0
  gateway 210.10.10.10
  
# Add the following configuration lines to the second interface on the VM2

auto eth1
iface eth1 inet static
  address 210.10.20.11
  netmask 255.255.255.0
  gateway 210.10.20.10

```

## Setting up the Router

As the DSL was not available, use the Ubuntu as the router

Login to the newly created Ubuntu VM and run the following command.

```bash
sudo sh -c "echo1 > /proc/sys/net/ipv4/ip_forward"
```


