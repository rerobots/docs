# Desarrolla habilidades para los robots Misty

## Resumen

En este tutorial, se le muestra cómo usar rerobots como plataforma para desarrollar
[Habilidades de robot brumoso](https://docs.mistyrobotics.com/).

Si cree que falta algo o si encuentra errores, [comuníquese con
nosotros](https://rerobots.net/contact) o [abrir un ticket](
https://github.com/rerobots/docs/issues).

## Requisitos previos

Este tutorial asume que ya tiene alguna instancia de espacio de trabajo con un Misty
robot. Para obtener instrucciones sobre cómo hacerlo, lea: [Pruebe la API de Misty con un
apoderado](/tutorials/proxy_fixedmisty).

## Cambia el color del LED e inclina la cabeza del robot

Las imágenes de ejemplo en esta sección son de un[`fixed_misty2`](
/workspaces/fixed_misty2.html) espacio de trabajo, en particular el
[despliegue
2c0873b5](https://rerobots.net/workspace/2c0873b5-1da1-46e6-9658-c40379774edf).

Tras una nueva instanciación de un [`fixed_misty2`](
/workspaces/fixed_misty2.html) espacio de trabajo, la vista de cámara externa
aparece como

![vista desde antesmistyrest.py](figures/mistyskills_beforeledtilt.jpg)

Si no sabe cómo abrir una vista de cámara, lea [otro tutorial](
/tutorials/proxy_fixedmisty).

Ahora, considere el código Python de ejemplo [mistyrest.py](
https://github.com/rerobots/examples/blob/497e3e808821878cad5a0ddbf9bb25900a57e6b8/misty2/mistyrest.py). Copiar y pegar
la URL HTTPS del panel "Misty robot proxy" de la página de detalles de su instancia
En [line 24 of mistyrest.py](
https://github.com/rerobots/examples/blob/497e3e808821878cad5a0ddbf9bb25900a57e6b8/misty2/mistyrest.py#L24).Él
El panel con la URL aparecerá similar a lo siguiente:

![captura de pantalla del panel proxy de Misty](figures/proxy_fixedmisty_proxypanel.png)

Este ejemplo demuestra cómo usar [Misty REST
API](https://docs.mistyrobotics.com/misty-ii/web-api/overview/) a través de los robots
apoderado. Si tenía el robot en su red local, entonces `MPURL` puede ser
la dirección IP del robot.

Ahora, con la URL del proxy guardada en `MPURL`, intente ejecutar mistyrest.py en su
propia computadora En algún momento durante la operación, la cabeza debe aparecer inclinada a medida que
esta en la siguiente imagen:

![vista desde despues mistyrest.py](figures/mistyskills_afterledtilt.jpg)

Cada acción básica del código Python de ejemplo es poco más que HTTP GET o
PUBLICAR. Considere el comando para cambiar el color del LED ([lines 29 - 33](
https://github.com/rerobots/examples/blob/497e3e808821878cad5a0ddbf9bb25900a57e6b8/misty2/mistyrest.py#L29-L33)):

```python
# Cambia el color del LED del cofre a verde
# https://docs.mistyrobotics.com/misty-ii/web-api/api-reference/#changeled
res = requests.post(MPURL + '/api/led', json={
    'red': 0,
    'green': 255,
    'blue': 0,
})
```

Sigue la [documentación oficial de referencia de Misty](
https://docs.mistyrobotics.com/misty-ii/web-api/api-reference/#changeled).
A esta llamada le sigue

```python
assert res.ok, 'response from POST /api/led: {} {}'.format(res.status_code, res.reason)
```
para verificar que la respuesta HTTP indique éxito. Si no es así, entonces algunos
se imprime el mensaje de error.