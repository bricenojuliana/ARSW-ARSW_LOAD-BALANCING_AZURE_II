### Escuela Colombiana de Ingeniería
### Arquitecturas de Software - ARSW

## Escalamiento en Azure con Maquinas Virtuales, Sacale Sets y Service Plans

### Dependencias
* Cree una cuenta gratuita dentro de Azure. Para hacerlo puede guiarse de esta [documentación](https://azure.microsoft.com/es-es/free/students/). Al hacerlo usted contará con $100 USD para gastar durante 12 meses.
Antes de iniciar con el laboratorio, revise la siguiente documentación sobre las [Azure Functions](https://www.c-sharpcorner.com/article/an-overview-of-azure-functions/)

### Parte 0 - Entendiendo el escenario de calidad

Adjunto a este laboratorio usted podrá encontrar una aplicación totalmente desarrollada que tiene como objetivo calcular el enésimo valor de la secuencia de Fibonnaci.

**Escalabilidad**
Cuando un conjunto de usuarios consulta un enésimo número (superior a 1000000) de la secuencia de Fibonacci de forma concurrente y el sistema se encuentra bajo condiciones normales de operación, todas las peticiones deben ser respondidas y el consumo de CPU del sistema no puede superar el 70%.

### Escalabilidad Serverless (Functions)

1. Cree una Function App tal cual como se muestra en las  imagenes.

![](images/part3/part3-function-config.png)

![](images/part3/part3-function-configii.png)

2. Instale la extensión de **Azure Functions** para Visual Studio Code.

![](images/part3/part3-install-extension.png)

3. Despliegue la Function de Fibonacci a Azure usando Visual Studio Code. La primera vez que lo haga se le va a pedir autenticarse, siga las instrucciones.

![](images/part3/part3-deploy-function-1.png)

![](images/part3/part3-deploy-function-2.png)

4. Dirijase al portal de Azure y pruebe la function.

![](images/part3/part3-test-function.png)

5. Modifique la coleción de POSTMAN con NEWMAN de tal forma que pueda enviar 10 peticiones concurrentes. Verifique los resultados y presente un informe.

6. Cree una nueva Function que resuleva el problema de Fibonacci pero esta vez utilice un enfoque recursivo con memoization. Pruebe la función varias veces, después no haga nada por al menos 5 minutos. Pruebe la función de nuevo con los valores anteriores. ¿Cuál es el comportamiento?.

   - Si probamos valores muy altos la función falla directamente, si probamos varias veces la función creciendo de a poco los resultados, es menos probable que falle ya que almacena las respuestas previas. Usando esta técnica de subir los valores de 10k en 10k llegamos hasta 100000, luego dejamos de hacer solicitudes por 5 minutos, y al volver a hacer la petición pudo hacerla sin inconvenientes.

**Preguntas**

* ¿Qué es un Azure Function?

  - Azure Function es un servicio de Microsoft Azure que permite ejecutar pequeñas piezas de código, conocidas como funciones, sin preocuparse por la infraestructura subyacente. Estas funciones son ideales para tareas de corta duración o event-driven, como responder a eventos HTTP, mensajes en colas, cambios en una base de datos, entre otros.
    
* ¿Qué es serverless?

  - Serverless es un modelo de computación en la nube donde el proveedor (como Azure) gestiona automáticamente la infraestructura necesaria para ejecutar el código. Los desarrolladores solo se preocupan por escribir el código y no por el aprovisionamiento o la administración de servidores. Características clave:

    - Escalabilidad automática: La infraestructura escala según la demanda.
    - Pago por uso: Solo se paga por los recursos utilizados mientras el código está en ejecución.
      
* ¿Qué es el runtime y que implica seleccionarlo al momento de crear el Function App?

  - El runtime es el entorno que ejecuta las funciones. Determina las características, compatibilidad y lenguaje de programación que puede usar el Function App.
Al seleccionarlo, se define:

    - Lenguaje de desarrollo compatible: Ejemplo, .NET, Node.js, Python, Java.
    - Versiones del lenguaje y sus dependencias: Algunas versiones tienen soporte limitado.
    - Compatibilidad con características específicas: Cada runtime puede soportar diferentes configuraciones de triggers y bindings.
      
* ¿Por qué es necesario crear un Storage Account de la mano de un Function App?

  - Un Storage Account es fundamental porque:

    - Gestión de datos y estados: Se utiliza para almacenar datos como estados de ejecución en funciones con Durable Functions.
    - Colas y blobs: Muchas funciones se disparan por eventos asociados a blobs o colas en el Storage Account.
    - Infraestructura interna: Almacena archivos del sistema, logs y configuraciones requeridas por Azure Functions.
  
* ¿Cuáles son los tipos de planes para un Function App?, ¿En qué se diferencias?, mencione ventajas y desventajas de cada uno de ellos.

  - Consumption Plan:

    - Escalabilidad: Escala automáticamente.
    - Ventaja: Solo se paga por las ejecuciones y el tiempo de uso.
    - Desventaja: Limitaciones de ejecución (máximo 5 minutos por defecto, ampliable a 10).
      
  - Premium Plan:

    - Escalabilidad: Escala rápidamente y ofrece instancias precalentadas.
    - Ventaja: Mayor control y soporte para funciones más largas.
    - Desventaja: Es más costoso que el plan de consumo.

  - Dedicated (App Service Plan):

    - Escalabilidad: Basada en la configuración del App Service Plan.
    - Ventaja: Permite funciones constantes en entornos donde ya se usa App Service.
    - Desventaja: Puede ser más caro si no está optimizado para cargas constantes.

* ¿Por qué la memoization falla o no funciona de forma correcta?

    - Porque la función requiere de que se calculen nos n-1 resultados de manera recurrente para poder dar respuesta, lo que significa un consumo de memoria y cpu muy alto en valores N muy grandes. En casos donde la consultas previas no ayuden a saber valores cercanos al solicitado, falla la función por recursos insuficientes.
       
* ¿Cómo funciona el sistema de facturación de las Function App?

  - Consumption Plan:

    - Costo por ejecución: Se factura según el número de ejecuciones.
    - Costo por tiempo de ejecución: Se paga por el tiempo que la función está en ejecución (en GB-s, basado en el consumo de memoria).

  - Premium Plan:

    - Costo fijo por instancia precalentada.
    - Costo por ejecución y tiempo de uso.

  - Dedicated Plan:

    - Facturación como cualquier App Service Plan (costo fijo basado en recursos asignados).
      
* Informe
  1. Buscamos una función App en el portal de azure

  ![image](https://github.com/user-attachments/assets/bae21341-b148-497d-9f6c-63204809cc49)

  2. Elegimos el plan de consumption el cual cobra por uso de la función

  ![image](https://github.com/user-attachments/assets/a77a26b2-1092-4843-9f4c-6829e5b4ac7b)

  3. Elegimos una cuenta de almacenamiento y creamos

  ![image](https://github.com/user-attachments/assets/374053e2-e184-450d-96d5-5ccb299151e7)

  4. Desde VsCode descargamos la extensión de Azure Functions

   ![image](https://github.com/user-attachments/assets/53581579-7629-4cfb-8e51-013104e05bc2)

  5. Intentamos desplegar dando click derecho en ProjectFibonnaci y luego Deploy

   ![image](https://github.com/user-attachments/assets/8e2df127-01fd-46e7-80f9-c1c79ada3187)

  6. Debido a que da un error de versiones, nos dirijos al host.json y cambiamos las versiones a:

   ![image](https://github.com/user-attachments/assets/0198262e-8a22-4ff2-b399-a261919a13fd)

  7. Intentamos nuevamente desplegar y esta vez si funciona, debemos ver algo asi al entrar a la función en Azure

   ![image](https://github.com/user-attachments/assets/121f865d-1f73-4ad9-a043-0a4e3b85afd0)

  8. Ahora vamos a probarla, para eso damos click en el boton de Test/Run, eso nos despliega una ventana donde podemos ingresar los valores de Input, en este caso la variable nth le asignamos el valor de 1000000

  ![image](https://github.com/user-attachments/assets/2876f9e7-d0c5-4184-9835-95468e4c534b)

  9. Después de un tiempo resolviendo nos devuelve la respuesta en el output

   ![image](https://github.com/user-attachments/assets/057ddb05-d475-4271-a53d-22738c966176)

  10. Podemos ver las invocaciones a la función en la terminal

   ![image](https://github.com/user-attachments/assets/279e13ac-336a-47f0-8865-c3ac6b73b40a)

  11. Usando los archivos de postman del laboratorio pasado, cambiamos las variables para poder usar la función de azure con peticiones concurrentes.

   ![image](https://github.com/user-attachments/assets/404628a2-eb08-40ae-b18e-9aca194a2c90)
   ![image](https://github.com/user-attachments/assets/354c6486-e981-47cb-a3fa-9500527d9f9a)

  12. Ejecutamos newman y las peticiones se resuelven en un tiempo de 2m 30 segundos aproximadamente, sin errores de peticiones y con un tiempo el promedio mejor que en las consultas realizadas con escalado horizontal y vertical realizados anteriormente en otros laboratorios.

   ![image](https://github.com/user-attachments/assets/8f769653-c25d-46f5-8982-a139b8770557)

  13. Ahora vamos a hacer que la función funcione con un enfoque recursivo con memoization, para eso cambiamos el contenido de index.js

   ![image](https://github.com/user-attachments/assets/16cd5381-4875-4b21-be64-77d1d5ff68ee)

  14. Desplegamos y probamos la función

   ![image](https://github.com/user-attachments/assets/81a01660-20c7-42d4-b473-9cbc06820d7a)

  15. Como la respuesta se esta dando, funciona la función

   ![image](https://github.com/user-attachments/assets/932106ba-7800-43e3-9bd7-692af748b525)

  16.  Realizamos muchas pruebas con esta función nueva, nos dimos cuenta que es capaz de ir aprendiendo a resolver consultas muy grandes si se le enseña de a poco, por ejemplo si primero se consulta el valor de nth: 10000, luego es capaz de resolver la de 20000. Hicimos el experimento de ir subiendo de 10k en 10k los valores, llegamos a hacer crecer los valores hasta 150000, en caso de que la función no pueda resolver el problema por algun fallo que creemos que es de memoria limite, se olvida de todo lo aprendido y toca volver a enseñarle de a pocos. Luego hicimos la prueba de hacer peticiones hasta llegar a 100000, esperamos 5 minutos sin hacer ninguna petición y luego le pedimos de nuevo el valor de 100000, lo resolvió de manera satisfactoria.

  ![image](https://github.com/user-attachments/assets/77f8e04b-fd51-4be6-8338-c4d5748ec8b0)

