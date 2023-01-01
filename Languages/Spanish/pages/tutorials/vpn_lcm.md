# Instancia basada en VPN con LCM

## Resumen

En este tutorial, se muestra cómo instanciar un espacio de trabajo al que se accede
sobre VPN y para el cual [LCM](https://lcm-proj.github.io/) proporciona mensajería.

Si cree que falta algo o si encuentra errores, [comuníquese con
us](https://rerobots.net/contact) o [abrir un
boleto] (https://github.com/rerobots/docs/issues).

## Requisitos previos

El proceso de creación de instancias para este tutorial es completamente similar al del
tutorial [instancia basada en VPN con ROS y Brunel
Hand](/tutorials/vpn_brunelhand) hasta el final de la subsección [Su
primer inicio de sesión](/tutorials/vpn_brunelhand#your-first-log-in) en ese tutorial.
Tenga en cuenta que las instrucciones aquí para pasar mensajes LCM hacia y desde su
La instancia se puede aplicar a cualquier tipo de espacio de trabajo.

## Construcción e instalación de LCM

Esta subsección proporciona instrucciones para instalar LCM en su nuevo espacio de trabajo
instancia. Para obtener la última [oficial
release](https://github.com/lcm-proj/lcm/releases), en la terminal que tiene un
sesión SSH activa, ingrese

```bash
enrollamiento -L -O https://github.com/lcm-proj/lcm/archive/v1.3.1.tar.gz
shasum -a 256 v1.3.1.tar.gz
```

La última línea de salida debe ser

```bash
d9765731127e5138017938c2f990eda6d8a8df260c98fe3053189db7954b9a41 v1.3.1.tar.gz
```

Verificar el hash SHA-256 del archivo descargado brinda confianza de que el
El archivo no ha sido modificado maliciosamente.
Suponiendo que la imagen base utilizada en [el tutorial con ROS y Brunel
Hand](/tutorials/vpn_brunelhand), se deben instalar dos paquetes más:

```bash
apt-get -y install autoconf libglib2.0-dev
```

Ahora, cree LCM a partir de la versión de origen de la siguiente manera

```bash
tar -xzf v1.3.1.tar.gz
cd lcm-1.3.1/
./configurar && hacer && hacer instalar
```

Como comprobación superficial de la instalación, intente

```bash
lcm-gen --versión
```

que debe imprimir su número de versión.
Ahora, termine de configurar el host de la instancia:
```bash
exportar LD_LIBRARY_PATH=/usr/local/lib:$LD_LIBRARY_PATH
exportar LCM_DEFAULT_URL=udpm://239.255.76.67:7667?ttl=1
sudo ruta agregar -net 224.0.0.0 máscara de red 240.0.0.0 dev tap0
```

Las dos últimas líneas son críticas porque

1. configurar LCM para usar `TTL=1`, lo que hace que los mensajes de multidifusión se envíen desde el host a la red (hasta un salto); y
2. agregue una ruta que envíe mensajes de multidifusión LCM al dispositivo `tap0`, que corresponde a la VPN de la instancia.
## Ejemplo: oyente y remitente

Para el oyente LCM de Python de ejemplo,

```bash
cd /root/lcm-1.3.1/ejemplos/python
./tipos-gen.sh
```

que generará los tipos de mensajes que se utilizan en este ejemplo. Ahora

```bash
python listener.py
```

Abra una nueva terminal en su computadora, es decir, la computadora desde la que está
siguiendo este tutorial, no el de la instancia.
Cree LCM localmente si aún no lo tiene.
Luego, configure el enrutamiento para la subred de multidifusión LCM:

```bash
sudo ruta agregar -net 224.0.0.0 máscara de red 240.0.0.0 dev tap0
```

Finalmente, comience a enviar mensajes LCM

```bash
exportar LCM_DEFAULT_URL=udpm://239.255.76.67:7667?ttl=1
python enviar-mensaje.py
```

y se debe imprimir un mensaje desde el programa listener.py que se está ejecutando
dentro de la instancia.