
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
    h2 = net.addHost( 'h2', ip='10.0.0.2' )
    info( '*** Adding switch\n' )
    s1 = net.addSwitch( 's1' )
    info( '*** Creating links\n' )
    net.addLink( h1, s1 )
    net.addLink( h2, s1 )
    info( '*** Starting network\n')
    net.start()
    info( '*** Running CLI\n' )
    CLI( net )
    info( '*** Stopping network' )
    net.stop()

if __name__ == '__main__':
  setLogLevel( 'info' )
  emptyNet()
