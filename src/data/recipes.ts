export interface Recipe {
  name: string;
  source: string | null;
  intro: string;
  info: string[];
  ingredients: [string, string[]][];
  steps: string[];
  tip: string;
  personalize: string;
  storage: string;
  airfryer: string;
  chef_ai: string[];
  sugar_note?: string;
  image?: string;
}

export interface RecipesData {
  panes: Recipe[];
  bases: Recipe[];
  postres: Recipe[];
}

export const RECIPES_DATA: RecipesData = {
  "panes": [
    {
      "name": "1. Pan de Molde Clasico",
      "source": "Fuente verificada -- Glutendence",
      "intro": "El pan que abre la puerta a todo lo demas. Miga suave y corteza fina, perfecta para tostadas y sandwiches.",
      "info": [
        "Prep 15 min",
        "Reposo 90 min",
        "Horneado 40 min",
        "Rinde 10-12 rebanadas",
        "Molde 26x8 cm"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "60 g harina de quinoa",
            "210 g almidon de maiz",
            "30 g almidon de patata",
            "9 g psyllium husk",
            "6 g sal",
            "6 g impulsor (polvo para hornear)",
            "3 g levadura seca instantanea"
          ]
        ],
        [
          "Humedos",
          [
            "1 huevo mediano (50 g)",
            "40 g aceite de oliva suave",
            "230 g agua tibia (35-38 C)"
          ]
        ]
      ],
      "steps": [
        "Mezcla los secos, menos el psyllium. Distribuye bien el psyllium in este punto para que no queden grumos concentrados en un solo lugar de la masa.",
        "Bate el huevo con el aceite y el agua tibia. El agua no debe estar caliente al tacto -- si quema, puede afectar el desarrollo de la levadura.",
        "Vierte los liquidos sobre los secos, agrega el psyllium al final. Remueve 2-3 min. Notarás que la mezcla espesa visiblemente en los primeros minutos: es el psyllium empezando a formar el gel que reemplaza la función del gluten.",
        "Deja reposar 10 min hasta que espese. Este reposo es el que le da a la masa su elasticidad -- no te lo saltes aunque tengas prisa.",
        "Amasa 8-10 min. No necesitas la fuerza de un amasado con gluten -- es más sobre integrar los ingredientes que sobre desarrollar estructura.",
        "Forma una bola, colocala en el molde engrasado. Alisa la superficie con una espátula húmeda para un acabado más parejo.",
        "Cubre y deja reposar 90 min hasta duplicar tamano. Un lugar tibio (cerca de 25°C) acelera el proceso -- si tu cocina está fría, el horno apagado con la luz encendida suele ser un buen lugar de reposo.",
        "Hornea a 175 C durante 40 min.",
        "Enfria completamente sobre rejilla antes de cortar. Este paso importa más de lo que parece: la miga del pan sin gluten sigue asentándose mientras se enfría, y cortarlo antes lo comprime y lo vuelve gomoso."
      ],
      "tip": "Si la masa se ve humeda, es normal -- no agregues mas harina.",
      "personalize": "Semillas de girasol, linaza, romero, ajo en polvo o queso rallado en el Paso 3.",
      "storage": "Temp. ambiente 3 dias. Refrigeracion 7 dias. Congelacion 2 meses (rebanado).",
      "airfryer": "Precalienta la air fryer a 160°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa un molde apto para air fryer (metálico o de silicona, más pequeño que en horno tradicional) o coloca directamente sobre papel de hornear perforado, dejando espacio para que circule el aire por todos los lados. Cocina a 160°C durante 28-32 min, revisando a partir de la mitad del tiempo indicado -- las air fryer concentran más el calor que un horno y pueden dorar más rápido de lo esperado. Verifica el punto con la misma señal que en horno: sonido hueco al golpear la base, o un palillo insertado en el centro que salga limpio. Si notas que la superficie dora demasiado rápido antes de que el centro esté listo, cubre con un trozo de papel aluminio los últimos minutos.",
      "chef_ai": [
        "Puedo sustituir la harina de quinoa por otra?",
        "No tengo almidon de patata, que uso?",
        "Como se si mi levadura sigue activa?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032302/pan_de_molde_1785004126532.jpg_pauott.jpg"
    },
    {
      "name": "2. Pan para Hamburguesa",
      "source": "Fuente verificada -- Glutendence",
      "intro": "Firme por fuera, tierno por dentro. La patata cocida en la masa aporta una humedad que el agua sola no logra.",
      "info": [
        "Prep 20 min",
        "Reposo 60 min",
        "Horneado 15-20 min",
        "Rinde 6-8 bollos"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "60 g harina de trigo sarraceno",
            "210 g almidon de maiz",
            "30 g almidon de patata",
            "6 g psyllium husk",
            "6 g sal",
            "3 g levadura seca instantanea"
          ]
        ],
        [
          "Humedos",
          [
            "50 g huevo",
            "150 g patata cocida y machacada",
            "180-200 g agua tibia"
          ]
        ],
        [
          "Decorar (opcional)",
          [
            "1 huevo batido",
            "Semillas de ajonjoli"
          ]
        ]
      ],
      "steps": [
        "Prepara un prefermento: levadura + agua tibia + 2 cdas de harina de sarraceno. Deja espumar 10 min.",
        "Hierve y machaca la patata bien fina.",
        "Mezcla los secos restantes.",
        "Agrega el prefermento, resto del agua, huevo y patata. Mezcla -- la masa sera blanda.",
        "Reposa 1 hora en lugar tibio.",
        "Con manos aceitadas forma 6-8 bollos.",
        "Fermenta hasta duplicar tamano (45-60 min).",
        "Precalienta a 200 C con recipiente de agua para vapor.",
        "Pincela con huevo, agrega semillas. Hornea 15-20 min con vapor."
      ],
      "tip": "El vapor en los primeros minutos da la corteza fina caracteristica -- no te lo saltes.",
      "personalize": "Ajonjoli, semillas de amapola, oregano o queso rallado antes de hornear.",
      "storage": "Temp. ambiente 2 dias. Refrigeracion 5 dias. Congelacion 3 meses.",
      "airfryer": "Precalienta la air fryer a 180°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa un molde apto para air fryer (metálico o de silicona, más pequeño que en horno tradicional) o coloca directamente sobre papel de hornear perforado, dejando espacio para que circule el aire por todos los lados. Cocina a 180°C durante 12-15 min, revisando a partir de la mitad del tiempo indicado -- las air fryer concentran más el calor que un horno y pueden dorar más rápido de lo esperado. Verifica el punto con la misma señal que en horno: sonido hueco al golpear la base, o un palillo insertado en el centro que salga limpio.",
      "chef_ai": [
        "No tengo patata, puedo omitirla?",
        "Como hago una version vegana sin huevo?",
        "Por que mi masa quedo muy liquida?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032302/pan_hamburguesa_1785004141772.jpg_czxoef.jpg"
    },
    {
      "name": "3. Pan para Hot Dog",
      "source": "Fuente verificada -- Glutendence, 5/5 (9 votos)",
      "intro": "La version alargada del pan tierno, con goma xantana sumada al psyllium para mas elasticidad.",
      "info": [
        "Prep 20 min",
        "Reposo 60 min",
        "Horneado 20 min",
        "Rinde 6-8 unidades"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "60 g harina de trigo sarraceno",
            "210 g almidon de maiz",
            "30 g almidon de tapioca o patata",
            "6 g psyllium husk",
            "6 g goma xantana",
            "6 g sal",
            "3 g levadura seca instantanea"
          ]
        ],
        [
          "Humedos",
          [
            "50 g huevo",
            "50 g aceite de oliva",
            "190 g agua tibia"
          ]
        ]
      ],
      "steps": [
        "Prepara el prefermento con la levadura, agua tibia y 1 cda de harina.",
        "Mezcla los secos, menos la goma xantana.",
        "Agrega el prefermento, agua, huevo y aceite. Mezcla.",
        "Incorpora la goma xantana al final, con cuidado.",
        "Reposa 10 min.",
        "Forma cilindros alargados con manos aceitadas.",
        "Fermenta hasta duplicar (45-60 min).",
        "Hornea a 200 C con vapor durante 20 min."
      ],
      "tip": "Si la masa es dificil de manejar, humedece las manos con agua en vez de aceite.",
      "personalize": "Semillas de amapola o ajonjoli, o mostaza en polvo en la masa.",
      "storage": "Temp. ambiente 1-2 dias. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 180°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa un molde apto para air fryer (metálico o de silicona, más pequeño que en horno tradicional) o coloca directamente sobre papel de hornear perforado, dejando espacio para que circule el aire por todos los lados. Cocina a 180°C durante 15-18 min, revisando a partir de la mitad del tiempo indicado -- las air fryer concentran más el calor que un horno y pueden dorar más rápido de lo esperado. Verifica el punto con la misma señal que en horno: sonido hueco al golpear la base, o un palillo insertado en el centro que salga limpio.",
      "chef_ai": [
        "Puedo hacerlos mas finos, estilo argentino?",
        "No tengo goma xantana, que hago?",
        "Como evito que se aplanen?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032301/pan_hot_dog_1785004154149.jpg_etlum2.jpg"
    },
    {
      "name": "4. Bagels",
      "source": "Fuente verificada -- Glutendence, 4.8/5 (4 votos)",
      "intro": "Con su corteza brillante lograda al hervir la masa antes de hornear -- el paso que muchas recetas se saltan.",
      "info": [
        "Prep 25 min",
        "Reposo 40 min",
        "Coccion 30-35 min (incl. hervido)",
        "Rinde 6 unidades"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "15 g harina de garbanzo",
            "60 g harina de sorgo",
            "195 g almidon de maiz",
            "30 g almidon de tapioca",
            "6 g sal",
            "9 g goma xantana",
            "3 g levadura seca instantanea"
          ]
        ],
        [
          "Humedos",
          [
            "30 g aceite",
            "240 g agua"
          ]
        ],
        [
          "Bano de hervido",
          [
            "1 litro de agua",
            "1 cdta de bicarbonato de sodio"
          ]
        ],
        [
          "Decorar",
          [
            "1 clara de huevo batida",
            "Semillas de ajonjoli o amapola"
          ]
        ]
      ],
      "steps": [
        "Disuelve la levadura en agua tibia, deja espumar 5 min.",
        "Mezcla los secos.",
        "Agrega la levadura, resto del agua y el aceite. Mezcla sin grumos secos.",
        "Reposa 40 min.",
        "Divide en 6, forma bolas y haz un agujero grande en el centro.",
        "Hierve el agua con bicarbonato.",
        "Sumerge cada bagel 30-45 seg por lado.",
        "Escurre, coloca en bandeja, pincela con clara y agrega semillas.",
        "Hornea a 225 C durante 25-30 min."
      ],
      "tip": "No dejes de reposar la masa formada mas de 10 min antes de hervir, o quedaran apelmazados.",
      "personalize": "Rebozalos en semillas variadas o mezcla “everything bagel” despues de hervir.",
      "storage": "Temp. ambiente 2 dias. Congelacion 2 meses (cortados a la mitad).",
      "airfryer": "Precalienta la air fryer a 200°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa un molde apto para air fryer (metálico o de silicona, más pequeño que en horno tradicional) o coloca directamente sobre papel de hornear perforado, dejando espacio para que circule el aire por todos los lados. Cocina a 200°C durante 15-18 min, revisando a partir de la mitad del tiempo indicado -- las air fryer concentran más el calor que un horno y pueden dorar más rápido de lo esperado. Verifica el punto con la misma señal que en horno: sonido hueco al golpear la base, o un palillo insertado en el centro que salga limpio.",
      "chef_ai": [
        "Puedo hacerlos dulces con canela?",
        "Por que se cerro el agujero al hornear?",
        "No tengo harina de sorgo, con que la sustituyo?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032301/bagels_1785004177407.jpg_wdtxst.jpg"
    },
    {
      "name": "5. Pan de Avena y Yogur",
      "source": null,
      "intro": "Pan rapido, sin levadura ni fermentacion -- ideal cuando no puedes planificar con horas de anticipacion.",
      "info": [
        "Prep 15 min",
        "Sin reposo",
        "Horneado 45 min",
        "Rinde 10-12 rebanadas",
        "Molde 22x10 cm"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "220 g harina de avena certificada sin gluten",
            "80 g harina de almendra",
            "10 g polvo para hornear",
            "5 g sal"
          ]
        ],
        [
          "Humedos",
          [
            "170 g yogur griego natural sin azucar",
            "3 huevos",
            "30 ml aceite de oliva"
          ]
        ]
      ],
      "steps": [
        "Precalienta el horno a 180 C, engrasa el molde.",
        "Mezcla los secos.",
        "Bate el yogur, huevos y aceite.",
        "Une ambas mezclas sin batir de mas.",
        "Vierte en el molde y hornea de inmediato.",
        "Hornea 45 min, hasta que un palillo salga limpio.",
        "Enfria 15 min en el molde antes de desmoldar."
      ],
      "tip": "No dejes reposar esta masa -- el polvo para hornear pierde potencia si esperas.",
      "personalize": "Ralladura de limon, semillas de amapola, o arandanos secos sin azucar.",
      "storage": "Temp. ambiente 2 dias. Refrigeracion 5 dias. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 165°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa un molde apto para air fryer (metálico o de silicona, más pequeño que en horno tradicional) o coloca directamente sobre papel de hornear perforado, dejando espacio para que circule el aire por todos los lados. Cocina a 165°C durante 30-35 min, revisando a partir de la mitad del tiempo indicado -- las air fryer concentran más el calor que un horno y pueden dorar más rápido de lo esperado. Verifica el punto con la misma señal que en horno: sonido hueco al golpear la base, o un palillo insertado en el centro que salga limpio.",
      "chef_ai": [
        "No tengo yogur griego, que puedo usar?",
        "Como lo hago mas esponjoso?",
        "Puedo hacerlo vegano?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032301/pan_avena_yogur_1785004189905.jpg_bzfpal.jpg"
    },
    {
      "name": "6. Pan Integral de Almendras",
      "source": null,
      "intro": "Humedo y con sabor pronunciado a frutos secos -- mas cercano a un bizcocho salado que a un pan clasico.",
      "info": [
        "Prep 15 min",
        "Sin reposo",
        "Horneado 40 min",
        "Rinde 10 rebanadas",
        "Molde 22x10 cm"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "250 g harina de almendra",
            "50 g harina de avena certificada sin gluten",
            "10 g polvo para hornear",
            "5 g sal"
          ]
        ],
        [
          "Humedos",
          [
            "4 huevos grandes",
            "40 ml aceite de oliva",
            "70 ml leche o bebida vegetal sin azucar"
          ]
        ]
      ],
      "steps": [
        "Precalienta el horno a 175 C.",
        "Bate huevos, aceite y leche.",
        "Incorpora los secos hasta que no queden grumos.",
        "Vierte en molde, decora con semillas si quieres.",
        "Hornea 40 min hasta dorar.",
        "Enfria 15 min antes de desmoldar."
      ],
      "tip": "Queda naturalmente humedo por la grasa de la almendra -- no esperes textura seca.",
      "personalize": "Hierbas frescas o queso rallado para una version salada mas intensa.",
      "storage": "Temp. ambiente 2 dias. Refrigeracion 6 dias. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 160°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa un molde apto para air fryer (metálico o de silicona, más pequeño que en horno tradicional) o coloca directamente sobre papel de hornear perforado, dejando espacio para que circule el aire por todos los lados. Cocina a 160°C durante 28-30 min, revisando a partir de la mitad del tiempo indicado -- las air fryer concentran más el calor que un horno y pueden dorar más rápido de lo esperado. Verifica el punto con la misma señal que en horno: sonido hueco al golpear la base, o un palillo insertado en el centro que salga limpio. Se recomienda molde de silicona en vez de metal, para un desmolde más fácil en el espacio reducido del equipo.",
      "chef_ai": [
        "Puedo bajarle la cantidad de huevos?",
        "Quiero una version mas baja en grasa.",
        "Con que lo acompano mejor?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032301/pan_almendras_1785004202327.jpg_vmfztt.jpg"
    },
    {
      "name": "7. Pan de Romero y Ajo",
      "source": null,
      "intro": "Aromatico desde que entra al horno. Perfecto para acompanar sopas, ensaladas o una tabla de quesos.",
      "info": [
        "Prep 20 min",
        "Reposo 45 min",
        "Horneado 40 min",
        "Rinde 10 rebanadas"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "180 g harina de avena certificada sin gluten",
            "80 g harina de almendra",
            "40 g almidon de maiz",
            "9 g psyllium husk",
            "8 g levadura seca instantanea",
            "5 g sal"
          ]
        ],
        [
          "Humedos",
          [
            "1 huevo",
            "30 ml aceite de oliva",
            "230 ml agua tibia"
          ]
        ],
        [
          "Aromaticos",
          [
            "2 cdas romero fresco picado",
            "2 dientes de ajo picados"
          ]
        ]
      ],
      "steps": [
        "Activa la levadura en el agua tibia.",
        "Mezcla los secos.",
        "Agrega levadura, huevo, aceite, romero y ajo. Mezcla.",
        "Reposa 10 min.",
        "Vierte en molde, deja fermentar 45 min.",
        "Decora con romero, sal gruesa y aceite antes de hornear.",
        "Hornea a 190 C durante 40 min."
      ],
      "tip": "Pica el ajo bien fino -- trozos grandes pueden quemarse y amargar.",
      "personalize": "Sustituye el romero por tomillo u oregano, o agrega aceitunas negras.",
      "storage": "Temp. ambiente 2-3 dias. Refrigeracion 6 dias. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 170°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa un molde apto para air fryer (metálico o de silicona, más pequeño que en horno tradicional) o coloca directamente sobre papel de hornear perforado, dejando espacio para que circule el aire por todos los lados. Cocina a 170°C durante 28-30 min, revisando a partir de la mitad del tiempo indicado -- las air fryer concentran más el calor que un horno y pueden dorar más rápido de lo esperado. Verifica el punto con la misma señal que en horno: sonido hueco al golpear la base, o un palillo insertado en el centro que salga limpio. Vigila el ajo de la superficie -- si empieza a oscurecer demasiado antes de que el pan esté listo, cúbrelo con papel aluminio.",
      "chef_ai": [
        "Como lo hago mas suave de ajo?",
        "Puedo agregarle queso?",
        "Con que platos combina mejor?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032252/pan_romero_ajo_1785005141337.jpg_sta85l.jpg"
    },
    {
      "name": "8. Pan Alto en Proteina",
      "source": null,
      "intro": "Para quienes buscan mas proteina sin renunciar a la textura de un pan real. La hidratacion esta ajustada para compensar la proteina en polvo.",
      "info": [
        "Prep 20 min",
        "Reposo 45 min",
        "Horneado 40 min",
        "Rinde 10 rebanadas"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "160 g harina de avena certificada sin gluten",
            "60 g harina de almendra",
            "40 g almidon de maiz",
            "30 g proteina en polvo sin sabor",
            "9 g psyllium husk",
            "8 g levadura seca instantanea",
            "5 g sal"
          ]
        ],
        [
          "Humedos",
          [
            "2 huevos",
            "30 ml aceite de oliva",
            "260 ml agua tibia"
          ]
        ],
        [
          "Opcional",
          [
            "20 g semillas de chia",
            "20 g linaza"
          ]
        ]
      ],
      "steps": [
        "Activa la levadura.",
        "Mezcla los secos, incluida la proteina.",
        "Agrega levadura, resto de agua, huevos y aceite. La masa sera mas humeda de lo normal -- es esperado.",
        "Reposa 10 min.",
        "Vierte en molde, fermenta 45 min.",
        "Hornea a 190 C durante 40 min.",
        "Enfria completamente antes de cortar."
      ],
      "tip": "Si tu masa queda muy seca con estas cantidades, agrega agua de a cucharadas.",
      "personalize": "Chia o linaza para mas fibra y omega-3.",
      "storage": "Temp. ambiente 2 dias. Refrigeracion 5 dias. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 170°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa un molde apto para air fryer (metálico o de silicona, más pequeño que en horno tradicional) o coloca directamente sobre papel de hornear perforado, dejando espacio para que circule el aire por todos los lados. Cocina a 170°C durante 28-30 min, revisando a partir de la mitad del tiempo indicado -- las air fryer concentran más el calor que un horno y pueden dorar más rápido de lo esperado. Verifica el punto con la misma señal que en horno: sonido hueco al golpear la base, o un palillo insertado en el centro que salga limpio. Por el contenido de proteína en polvo, revisa el color desde antes de lo habitual para evitar que se dore de más.",
      "chef_ai": [
        "Que tipo de proteina en polvo funciona mejor?",
        "Mi pan quedo muy seco, que cambio?",
        "Cuanta proteina aporta cada rebanada?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032301/pan_alto_proteina_1785005153132.jpg_ij0q0j.jpg"
    },
    {
      "name": "9. Pan Rustico de Semillas",
      "source": null,
      "intro": "Corteza crujiente cubierta de semillas, estilo panaderia artesanal -- el mas vistoso del capitulo.",
      "info": [
        "Prep 20 min",
        "Reposo 45 min",
        "Horneado 40 min",
        "Rinde 10 rebanadas"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "200 g harina de avena certificada sin gluten",
            "60 g harina de almendra",
            "40 g almidon de maiz",
            "9 g psyllium husk",
            "8 g levadura seca instantanea",
            "5 g sal"
          ]
        ],
        [
          "Humedos",
          [
            "1 huevo",
            "30 ml aceite de oliva",
            "230 ml agua tibia"
          ]
        ],
        [
          "Semillas para la corteza",
          [
            "20 g girasol",
            "20 g linaza",
            "15 g chia",
            "15 g ajonjoli",
            "15 g calabaza"
          ]
        ]
      ],
      "steps": [
        "Activa la levadura.",
        "Mezcla los secos con los humedos.",
        "Reposa 10 min.",
        "Forma una hogaza redonda sobre papel de hornear.",
        "Humedece la superficie y presiona las semillas por fuera.",
        "Fermenta 45 min.",
        "Haz 2-3 cortes superficiales antes de hornear.",
        "Hornea a 190 C durante 40 min.",
        "Enfria completamente antes de cortar."
      ],
      "tip": "Los cortes no son solo decorativos -- evitan que se agriete de forma irregular.",
      "personalize": "Cambia la mezcla de semillas segun lo que tengas.",
      "storage": "Temp. ambiente 2-3 dias. Congelacion 2 meses.",
      "airfryer": "Esta receta funciona en air fryer con algunas limitaciones según el tamaño de tu equipo -- si tu cesta es pequeña, considera usar la versión de horno tradicional para un resultado más predecible. Precalienta la air fryer a 170°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa un molde apto para air fryer (metálico o de silicona, más pequeño que en horno tradicional) o coloca directamente sobre papel de hornear perforado, dejando espacio para que circule el aire por todos los lados. Cocina a 170°C durante 30-35 min, revisando a partir de la mitad del tiempo indicado -- las air fryer concentran más el calor que un horno y pueden dorar más rápido de lo esperado. Verifica el punto con la misma señal que en horno: sonido hueco al golpear la base, o un palillo insertado en el centro que salga limpio.",
      "chef_ai": [
        "Que otras semillas puedo usar?",
        "Por que se agrieto de forma irregular?",
        "Como logro una corteza mas crujiente?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032300/pan_rustico_semillas_1785005162609.jpg_o2thn7.jpg"
    },
    {
      "name": "10. Pan Multisemillas",
      "source": null,
      "intro": "Las semillas van integradas en toda la masa, no solo por fuera -- sabor a semillas en cada bocado.",
      "info": [
        "Prep 20 min",
        "Reposo 45 min",
        "Horneado 40 min",
        "Rinde 10 rebanadas",
        "Molde 22x10 cm"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "180 g harina de avena certificada sin gluten",
            "80 g harina de almendra",
            "40 g almidon de maiz",
            "9 g psyllium husk",
            "8 g levadura seca instantanea",
            "5 g sal"
          ]
        ],
        [
          "Humedos",
          [
            "2 huevos",
            "240 ml agua tibia"
          ]
        ],
        [
          "Semillas (integradas)",
          [
            "20 g girasol",
            "20 g linaza",
            "15 g chia",
            "15 g ajonjoli"
          ]
        ]
      ],
      "steps": [
        "Activa la levadura.",
        "Mezcla los secos con toda la mezcla de semillas.",
        "Agrega levadura y huevos. Mezcla hasta distribuir bien las semillas.",
        "Reposa 10 min.",
        "Vierte en molde engrasado.",
        "Fermenta 45 min.",
        "Hornea a 190 C durante 40 min.",
        "Enfria completamente antes de cortar."
      ],
      "tip": "Si quieres semillas tambien en la corteza, reserva un punado para espolvorear encima.",
      "personalize": "Agrega copos de avena o quinoa inflada para mas textura.",
      "storage": "Temp. ambiente 2-3 dias. Refrigeracion 6 dias. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 170°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa un molde apto para air fryer (metálico o de silicona, más pequeño que en horno tradicional) o coloca directamente sobre papel de hornear perforado, dejando espacio para que circule el aire por todos los lados. Cocina a 170°C durante 28-30 min, revisando a partir de la mitad del tiempo indicado -- las air fryer concentran más el calor que un horno y pueden dorar más rápido de lo esperado. Verifica el punto con la misma señal que en horno: sonido hueco al golpear la base, o un palillo insertado en el centro que salga limpio. Las semillas de la superficie pueden dorar antes que el interior -- cúbrelas con papel aluminio si es necesario.",
      "chef_ai": [
        "Que otras semillas puedo integrar?",
        "Como evito que se hundan al fondo?",
        "Aporta mas fibra que el pan de molde clasico?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032252/pan_multisemillas_1785005171790.jpg_jbjjwx.jpg"
    },
    {
      "name": "11. Pan Keto Individual de Queso Parmesano",
      "source": "Receta Cetogenica",
      "intro": "Un pan individual rapido, de textura aireada y delicioso aroma a queso parmesano tostado. Es ideal para acompañar tus comidas sin salirte de la cetosis.",
      "info": [
        "Prep 5 min",
        "Reposo 3 min",
        "Horneado 15-18 min",
        "Rinde 1 porcion",
        "Macros: Fat 29g, Proteina 15g, Carbs netos 5g, 379 kcal"
      ],
      "ingredients": [
        [
          "Ingredientes",
          [
            "1 cda mantequilla derretida",
            "2 cdas harina de coco",
            "1/4 cdta polvo de hornear",
            "1 huevo",
            "1 cda crema de leche",
            "2 cdas agua",
            "1/4 taza queso parmesano rallado",
            "sal y pimienta al gusto"
          ]
        ]
      ],
      "steps": [
        "Precalienta el horno a 180°C. Engrasa un molde individual.",
        "Bate el huevo con la mantequilla derretida, la crema de leche y el agua hasta integrar.",
        "Agrega la harina de coco, el polvo de hornear, sal y condimentos. Deja reposar 2-3 minutos para que la harina de coco absorba el liquido.",
        "Incorpora el queso parmesano.",
        "Vierte en el molde y hornea 15-18 minutos, hasta que este firme y dorado.",
        "Deja enfriar 5 minutos antes de desmoldar."
      ],
      "tip": "Deja reposar la masa los minutos indicados: la harina de coco requiere tiempo para absorber la humedad y dar la consistencia correcta.",
      "personalize": "Anade una pizca de ajo en polvo, oregano seco o paprika para darle un toque italiano adicional.",
      "storage": "Consumir en el dia preferentemente. Puedes guardarlo tapado hasta por 24 horas en refrigeracion.",
      "airfryer": "Se puede preparar en air fryer horneando a 160°C por 10-12 minutos en un molde individual apto.",
      "chef_ai": [
        "¿Puedo sustituir la harina de coco por harina de almendras?",
        "¿Que puedo usar in lugar de crema de leche?",
        "¿Por que quedo muy seco?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032300/pan_keto_parmesano_1785005180893.jpg_dgs8yg.jpg"
    },
    {
      "name": "12. Pan Keto Alto en Proteina",
      "source": "Receta Cetogenica",
      "intro": "Un pan keto denso, sumamente saciante y con excelente estructura gracias a la mozzarella derretida y la proteina whey. Perfecto para sandwiches densos o tostadas.",
      "info": [
        "Prep 20 min",
        "Horneado 35-40 min",
        "Rinde 16 porciones",
        "Macros por porcion: Fat 15g, Proteina 13.5g, Carbs netos 2.5g, 200 kcal"
      ],
      "ingredients": [
        [
          "Ingredientes",
          [
            "3 tazas queso mozzarella rallado (300g)",
            "4 oz queso crema (112g)",
            "2 huevos",
            "2 tazas harina de almendra (200g)",
            "1/2 taza proteina whey sin sabor (32g)",
            "1/4 taza yogurt griego (60g)",
            "1 cda polvo de hornear (12g)",
            "1/2 cdta sal (2g)"
          ]
        ]
      ],
      "steps": [
        "Precalienta el horno a 175°C. Forra un molde de pan.",
        "Derrite el queso mozzarella y el queso crema juntos hasta integrar por completo.",
        "Mezcla en un bowl aparte la harina de almendra, la proteina whey, el polvo de hornear y la sal.",
        "Agrega los huevos y el yogurt griego a la mezcla de queso derretido, integrando rapido.",
        "Incorpora los secos a la mezcla humeda hasta formar una masa uniforme (puede quedar pegajosa, es normal).",
        "Coloca en el molde, alisa la superficie.",
        "Hornea 35-40 minutos hasta dorar y firmar.",
        "Enfria completamente sobre rejilla antes de cortar."
      ],
      "tip": "Para derretir los quesos puedes usar microondas en intervalos de 30 segundos, mezclando en cada pausa, o a bano Maria.",
      "personalize": "Espolvorea semillas de sesamo o amapola en la parte superior antes de hornear para darle un toque crujiente.",
      "storage": "Guarda en el refrigerador hasta por 5 dias en un recipiente hermetico, o rebana y congela por 2 meses.",
      "airfryer": "Se puede hornear a 160°C en molde pequeno cubriendo con aluminio si se dora demasiado rapido.",
      "chef_ai": [
        "¿Que tipo de proteina whey sin sabor recomiendas?",
        "¿Puedo omitir la mozzarella?",
        "¿Por que quedo muy humedo en el centro?"
      ],
      "image": "https://res.cloudinary.com/omai5eeg/image/upload/v1785032300/pan_keto_proteina_1785005190693.jpg_gi7sx7.jpg"
    }
  ],
  "bases": [
    {
      "name": "1. Base de Pizza Clasica",
      "source": "Fuente verificada -- Glutendence, 4.5/5 (36 votos)",
      "intro": "Se prepara y hornea en menos de 30 minutos, sin las horas de fermentacion de un pan tradicional.",
      "info": [
        "Prep 15 min",
        "Reposo 10 min",
        "Horneado 10 min + ingredientes",
        "Rinde 1 base individual"
      ],
      "ingredients": [
        [
          "Ingredientes",
          [
            "110 g harina de arroz",
            "40 g almidon de patata o tapioca",
            "4 g psyllium husk",
            "3 g sal",
            "2 g levadura seca instantanea",
            "120 ml agua tibia",
            "Unas gotas de vinagre",
            "Aceite de oliva, para untar",
            "Salsa de tomate e ingredientes al gusto"
          ]
        ]
      ],
      "steps": [
        "Activa la levadura in el agua tibia, deja espumar 5-10 min.",
        "Mezcla la harina, el almidon, la sal y el psyllium.",
        "Agrega la levadura y el vinagre. Mezcla -- la masa sera blanda.",
        "Reposa 10 min.",
        "Precalienta el horno a la temperatura maxima (idealmente 250 C).",
        "Extiende la masa sobre papel aceitado con manos humedas.",
        "Hornea la base sola 10 min.",
        "Agrega salsa e ingredientes, vuelve a hornear hasta que esten listos."
      ],
      "tip": "Elige ingredientes que requieran poco tiempo de coccion -- esta base se hornea rapido.",
      "personalize": "Vinagre de manzana en vez de blanco, u oregano seco en la masa.",
      "storage": "La base prehorneada se congela hasta 2 meses.",
      "airfryer": "Precalienta la air fryer a 200°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Trabaja en tandas si tu cesta es pequeña -- no sobrecargues el espacio, el aire necesita circular libremente alrededor de toda la preparación. Cocina a 200°C durante 8-10 min, revisando a mitad de camino para reposicionar si es necesario. Confirma el punto por textura y color dorado parejo, no solo por el reloj -- cada equipo de air fryer varía ligeramente en potencia real.",
      "chef_ai": [
        "Como la hago mas gruesa, estilo americano?",
        "No tengo psyllium, puedo usar goma xantana?",
        "Puedo congelar varias bases?"
      ]
    },
    {
      "name": "2. Focaccia sin Gluten (con Calabaza)",
      "source": "Fuente verificada -- Glutendence",
      "intro": "Corteza que casi se frie en su propio aceite, con color dorado natural gracias a la calabaza asada en la masa.",
      "info": [
        "Prep 25 min (incl. asar calabaza)",
        "Reposo 60 min",
        "Horneado 25-30 min",
        "Rinde 6-8 porciones",
        "Molde 20x30 cm"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "50 g harina de arroz",
            "50 g harina de trigo sarraceno",
            "125 g almidon de maiz",
            "25 g almidon de tapioca o patata",
            "5 g goma xantana",
            "4 g sal",
            "4 g levadura seca instantanea"
          ]
        ],
        [
          "Humedos",
          [
            "150 g calabaza asada, sin piel y machacada",
            "25 g aceite de oliva",
            "175 g agua"
          ]
        ],
        [
          "Superficie",
          [
            "Aceite de oliva extra",
            "Sal en escamas, romero fresco o cebolla en tiras"
          ]
        ]
      ],
      "steps": [
        "Asa la calabaza en rodajas a 180 C hasta que se atraviese facil. Deja enfriar.",
        "Pela y machaca hasta obtener pure.",
        "Mezcla los secos.",
        "Agrega el pure, aceite y agua. Mezcla -- masa blanda y pegajosa.",
        "Vierte en la bandeja, extiende con manos humedas.",
        "Reposa 60 min.",
        "Cubre con aceite, haz los hoyuelos caracteristicos con los dedos.",
        "Decora con sal, romero o cebolla.",
        "Hornea a 225 C durante 20-25 min, luego 5 min mas arriba para dorar."
      ],
      "tip": "Cubrir con abundante aceite antes de hornear no es opcional -- da la corteza caracteristica.",
      "personalize": "Sustituye por batata asada, o eliminala para una focaccia clasica.",
      "storage": "Temp. ambiente 2 dias. Congelacion 2 meses (recalienta en horno, no microondas).",
      "airfryer": "Esta receta funciona en air fryer con algunas limitaciones según el tamaño de tu equipo -- si tu cesta es pequeña, considera usar la versión de horno tradicional para un resultado más predecible. Precalienta la air fryer a 190°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Trabaja en tandas si tu cesta es pequeña -- no sobrecargues el espacio, el aire necesita circular libremente alrededor de toda la preparación. Cocina a 190°C durante 18-20 min, revisando a mitad de camino para reposicionar si es necesario. Confirma el punto por textura y color dorado parejo, no solo por el reloj -- cada equipo de air fryer varía ligeramente en potencia real.",
      "chef_ai": [
        "Puedo usar batata en vez de calabaza?",
        "Como consigo hoyuelos mas marcados?",
        "Que relleno le pongo para sandwiches?"
      ]
    },
    {
      "name": "3. Base de Pizza de Coliflor",
      "source": "Compilada de multiples fuentes reales coincidentes",
      "intro": "Alternativa sin harina como protagonista: mas ligera, con menos carbohidratos, y no sabe a coliflor una vez horneada.",
      "info": [
        "Prep 20 min",
        "Sin reposo",
        "Horneado 20-25 min base sola",
        "Rinde 1 base grande"
      ],
      "ingredients": [
        [
          "Ingredientes",
          [
            "500 g coliflor fresca, rallada o procesada fina",
            "1 huevo grande",
            "60 g queso mozzarella rallado",
            "20 g queso parmesano rallado",
            "20 g harina de almendra",
            "1 cdta oregano seco",
            "1/2 cdta ajo en polvo",
            "Sal y pimienta al gusto"
          ]
        ]
      ],
      "steps": [
        "Procesa o ralla la coliflor hasta textura de arroz.",
        "Cocina en microondas 8 min a maxima potencia, o al vapor.",
        "EL PASO MAS IMPORTANTE: envuelve la coliflor en un pano limpio y exprime con fuerza hasta que no salga mas agua.",
        "Mezcla la coliflor escurrida con huevo, quesos, harina de almendra, oregano, ajo, sal y pimienta.",
        "Forma un disco delgado sobre papel de hornear.",
        "Hornea la base sola a 200 C durante 20-25 min.",
        "Agrega ingredientes y hornea 10-15 min mas."
      ],
      "tip": "Cuanta mas agua elimines al escurrir, mas crujiente quedara -- exprime con fuerza real.",
      "personalize": "Harina de garbanzo en vez de almendra, o chia hidratada para reducir el huevo.",
      "storage": "Mejor consumir recien hecha -- recalienta en sarten, no en microondas.",
      "airfryer": "Precalienta la air fryer a 190°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Trabaja en tandas si tu cesta es pequeña -- no sobrecargues el espacio, el aire necesita circular libremente alrededor de toda la preparación. Cocina a 190°C durante 15-18 min, revisando a mitad de camino para reposicionar si es necesario. Confirma el punto por textura y color dorado parejo, no solo por el reloj -- cada equipo de air fryer varía ligeramente en potencia real. Usa papel de hornear perforado (o hazle agujeros tú mismo) para que la base no quede húmeda por falta de circulación de aire.",
      "chef_ai": [
        "Mi base quedo aguada, que hice mal?",
        "Puedo hacerla vegana sin huevo ni queso?",
        "Como consigo que no se rompa al levantarla?"
      ]
    },
    {
      "name": "4. Masa de Empanadas",
      "source": "Fuente verificada -- Glutendence, 5/5 (27 votos)",
      "intro": "Masa que se estira mucho y aguanta el relleno sin romperse -- sin necesidad de amasadora.",
      "info": [
        "Prep 20 min + relleno",
        "Sin reposo de masa",
        "Horneado 20-25 min",
        "Rinde 12-14 empanadas"
      ],
      "ingredients": [
        [
          "Masa",
          [
            "75 g harina de garbanzo",
            "125 g almidon de maiz",
            "25 g almidon de patata",
            "5 g goma xantana",
            "4 g sal",
            "100 g agua",
            "45 g aceite de girasol"
          ]
        ],
        [
          "Barnizar",
          [
            "1 huevo batido"
          ]
        ]
      ],
      "steps": [
        "Prepara el relleno con anticipacion y dejalo enfriar por completo.",
        "Mezcla los secos de la masa.",
        "Agrega agua y aceite, mezcla hasta homogeneizar.",
        "Divide en porciones.",
        "Estira cada porcion entre dos papeles de hornear, lo mas fina posible.",
        "Corta circulos con un cortapastas.",
        "Rellena, humedece el borde y cierra con repulgue o tenedor.",
        "Pincela con huevo batido.",
        "Hornea a 200 C durante 20-25 min."
      ],
      "tip": "Rellena y cierra la primera antes de estirar las demas -- si aguanta, todas pueden ir asi de finas.",
      "personalize": "Rellena con carne, pollo, verduras salteadas, o queso y espinaca.",
      "storage": "Temp. ambiente 1-2 dias. Refrigeracion 4 dias. Congelacion 3 meses (crudas u horneadas).",
      "airfryer": "Precalienta la air fryer a 180°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Trabaja en tandas si tu cesta es pequeña -- no sobrecargues el espacio, el aire necesita circular libremente alrededor de toda la preparación. Cocina a 180°C durante 12-15 min, revisando a mitad de camino para reposicionar si es necesario. Confirma el punto por textura y color dorado parejo, no solo por el reloj -- cada equipo de air fryer varía ligeramente en potencia real. No las amontones en la cesta -- necesitan espacio entre sí para dorar parejo por todos los lados.",
      "chef_ai": [
        "Puedo freirlas en vez de hornearlas?",
        "Se me rompio la masa al estirarla, que hago?",
        "Cuanto relleno le pongo sin que se rompan?"
      ]
    },
    {
      "name": "5. Base de Tarta (Masa Quebrada)",
      "source": "Fuente verificada -- Glutendence",
      "intro": "Se deshace en la boca gracias a la alta proporcion de mantequilla -- la base para cualquier tarta salada o dulce del libro.",
      "info": [
        "Prep 15 min",
        "Reposo 10-20 min en frio",
        "Horneado en blanco 15-20 min",
        "Rinde 1 base 22-24 cm"
      ],
      "ingredients": [
        [
          "Ingredientes",
          [
            "40 g almidon de tapioca",
            "60 g harina de maiz",
            "100 g harina de arroz",
            "100 g harina de sorgo",
            "100 g mantequilla fria, en cubos",
            "1 huevo",
            "75 ml agua",
            "6 g psyllium husk",
            "2 g sal"
          ]
        ]
      ],
      "steps": [
        "Mezcla los secos.",
        "Agrega la mantequilla fria y el huevo. Mezcla con las manos hasta textura arenosa.",
        "Si se calienta, enfria 10 min en refrigerador.",
        "Agrega el agua de a poco, solo hasta compactar.",
        "Forma un disco, envuelve y refrigera 15-20 min.",
        "Estira entre dos papeles de hornear y forra el molde.",
        "Para hornear en blanco: pincha con tenedor, cubre con peso y hornea 15 min a 180 C, retira el peso y hornea 5 min mas."
      ],
      "tip": "Es naturalmente quebradiza en crudo -- si se rompe, presiona los trozos directamente en el molde.",
      "personalize": "Para version dulce, agrega 20-30g de endulzante a los secos.",
      "storage": "Masa cruda: 3 dias en refrigeracion. Congelacion 2 meses.",
      "airfryer": "Esta receta funciona en air fryer con algunas limitaciones según el tamaño de tu equipo -- si tu cesta es pequeña, considera usar la versión de horno tradicional para un resultado más predecible. Precalienta la air fryer a 170°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Trabaja en tandas si tu cesta es pequeña -- no sobrecargues el espacio, el aire necesita circular libremente alrededor de toda la preparación. Cocina a 170°C durante 12-15 min, revisando a mitad de camino para reposicionar si es necesario. Confirma el punto por textura y color dorado parejo, no solo por el reloj -- cada equipo de air fryer varía ligeramente en potencia real.",
      "chef_ai": [
        "Puedo hacerla sin mantequilla, con aceite de coco?",
        "Se me agrieto al hornear, por que?",
        "Sirve para tartaletas individuales?"
      ]
    },
    {
      "name": "6. Quiche de Espinaca y Queso",
      "source": "Base verificada; relleno con proporcion estandar de custard",
      "intro": "Cremoso por dentro, firme por fuera -- un clasico frances sobre la base de tarta que ya dominaste.",
      "info": [
        "Prep 20 min",
        "Horneado 35-40 min",
        "Rinde 6 porciones",
        "Molde 22-24 cm"
      ],
      "ingredients": [
        [
          "Base",
          [
            "1 Base de Tarta (Receta 5), ya horneada en blanco"
          ]
        ],
        [
          "Relleno",
          [
            "3 huevos",
            "200 ml crema de leche o vegetal",
            "120 g queso rallado",
            "150 g espinaca fresca, salteada y escurrida",
            "Sal, pimienta y nuez moscada al gusto"
          ]
        ]
      ],
      "steps": [
        "Prepara y hornea en blanco la Base de Tarta.",
        "Saltea la espinaca hasta reducir volumen, escurre bien.",
        "Bate los huevos con la crema, sal, pimienta y nuez moscada.",
        "Distribuye espinaca y queso sobre la base.",
        "Vierte la mezcla de huevo y crema encima.",
        "Hornea a 180 C durante 35-40 min, hasta que el centro tenga ligero temblor.",
        "Reposa minimo 10 min antes de cortar."
      ],
      "tip": "Escurre bien cualquier verdura con agua -- es la causa numero uno de un quiche aguado.",
      "personalize": "Champinones salteados, tomate seco, o jamon en cubos.",
      "storage": "Refrigeracion 4 dias. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 160°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Trabaja en tandas si tu cesta es pequeña -- no sobrecargues el espacio, el aire necesita circular libremente alrededor de toda la preparación. Cocina a 160°C durante 30-35 min, revisando a mitad de camino para reposicionar si es necesario. Confirma el punto por textura y color dorado parejo, no solo por el reloj -- cada equipo de air fryer varía ligeramente en potencia real.",
      "chef_ai": [
        "Puedo hacerlo sin lacteos?",
        "Que verduras funcionan mejor sin aguar el relleno?",
        "Como se si ya esta listo?"
      ]
    },
    {
      "name": "7. Palitos de Pan (Breadsticks)",
      "source": "Adaptado de la formula base verificada del Capitulo 1",
      "intro": "Crujientes y delgados, ideales para acompanar una tabla de quesos o una sopa.",
      "info": [
        "Prep 20 min",
        "Reposo 30 min",
        "Horneado 20-25 min",
        "Rinde 16-18 palitos"
      ],
      "ingredients": [
        [
          "Ingredientes",
          [
            "180 g harina de avena certificada sin gluten",
            "80 g harina de almendra",
            "40 g almidon de maiz",
            "9 g psyllium husk",
            "8 g levadura seca instantanea",
            "5 g sal",
            "1 huevo",
            "25 ml aceite de oliva",
            "190 ml agua tibia",
            "Semillas de ajonjoli o sal gruesa"
          ]
        ]
      ],
      "steps": [
        "Activa la levadura.",
        "Mezcla los secos.",
        "Agrega levadura, huevo y aceite. Mezcla.",
        "Reposa 10 min.",
        "Forma 16-18 palitos finos y alargados.",
        "Decora con semillas o sal gruesa.",
        "Fermenta 20 min.",
        "Hornea a 180 C durante 20-25 min, hasta dorar y firmar por completo.",
        "Enfria sobre rejilla -- siguen crujiendo al enfriarse."
      ],
      "tip": "Para mas crujiente, apaga el horno cuando doren y dejalos dentro 10 min mas con la puerta entreabierta.",
      "personalize": "Queso parmesano rallado o hierbas secas en la masa.",
      "storage": "Temp. ambiente 5 dias. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 165°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Trabaja en tandas si tu cesta es pequeña -- no sobrecargues el espacio, el aire necesita circular libremente alrededor de toda la preparación. Cocina a 165°C durante 15-18 min, revisando a mitad de camino para reposicionar si es necesario. Confirma el punto por textura y color dorado parejo, no solo por el reloj -- cada equipo de air fryer varía ligeramente en potencia real. Al ser piezas delgadas, revisa a mitad de camino para asegurar que doren parejo por todos lados.",
      "chef_ai": [
        "Como los hago mas finos, tipo grissini?",
        "Puedo hacerlos dulces con canela?",
        "Me quedaron blandos por dentro, que ajusto?"
      ]
    },
    {
      "name": "8. Tortillas de Harina",
      "source": "Fuente verificada -- Glutendence",
      "intro": "Flexibles y resistentes -- el reto de una tortilla sin gluten es que no se rompa al doblarla.",
      "info": [
        "Prep 20 min",
        "Sin reposo",
        "Coccion 1-2 min por tortilla",
        "Rinde 4-6 tortillas"
      ],
      "ingredients": [
        [
          "Ingredientes",
          [
            "30 g harina de trigo sarraceno",
            "105 g almidon de maiz",
            "15 g almidon de patata o tapioca",
            "3 g goma xantana",
            "1 pizca de sal",
            "2 cdas aceite",
            "85 g agua"
          ]
        ]
      ],
      "steps": [
        "Mezcla los secos.",
        "Agrega agua y aceite, mezcla con cuchara y luego con manos.",
        "Amasa 2-3 min, sin agregar mas harina.",
        "Divide en 4-6 porciones.",
        "Estira cada porcion con rodillo hasta 2 mm o menos.",
        "Calienta una sarten de fondo grueso, sin aceite.",
        "Cocina 15-20 seg por lado, hasta que aparezcan burbujas.",
        "Apila cubiertas con un pano para que no se sequen."
      ],
      "tip": "Si la masa se dificulta al estirar, reduce ligeramente el agua la proxima vez.",
      "personalize": "Comino o pimenton en la masa para tacos con mas sabor.",
      "storage": "Temp. ambiente 1-2 dias. Refrigeracion 5 dias. Congelacion 2 meses.",
      "airfryer": "No aplica -- se cocina en sarten.",
      "chef_ai": [
        "Puedo usar solo harina de arroz?",
        "Se me rompen al doblarlas, que ajusto?",
        "Como las recaliento sin que se resequen?"
      ]
    }
  ],
  "postres": [
    {
      "name": "1. Brownies sin Azucar",
      "source": null,
      "intro": "Humedos por dentro, con costra ligeramente crujiente arriba -- sin gramo de azucar anadida.",
      "info": [
        "Prep 15 min",
        "Horneado 22-25 min",
        "Rinde 12 porciones",
        "Molde 20x20 cm"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "120 g harina de almendra blanqueada",
            "40 g cacao en polvo sin azucar",
            "70 g alulosa granulada",
            "5 g polvo para hornear",
            "1 pizca de sal"
          ]
        ],
        [
          "Humedos",
          [
            "3 huevos",
            "80 g mantequilla derretida",
            "5 ml extracto de vainilla"
          ]
        ],
        [
          "Acabado",
          [
            "80 g chocolate negro (70%+) picado",
            "30 g nueces picadas (opcional)"
          ]
        ]
      ],
      "steps": [
        "Precalienta a 175 C, forra el molde. Forrar el molde facilita desmoldar sin romper la preparación.",
        "Bate los huevos con la alulosa hasta aclarar. Verás que la mezcla cambia ligeramente de color y textura -- es la señal de que está lista para el siguiente paso.",
        "Incorpora la mantequilla tibia y la vainilla.",
        "Agrega harina, cacao, polvo para hornear y sal. Mezcla apenas. Un mezclado excesivo en este punto puede desarrollar más estructura de la necesaria y afectar la textura final.",
        "Incorpora chocolate y nueces.",
        "Hornea 22-25 min -- el centro debe quedar humedo. No te dejes engañar por la apariencia -- el centro sigue cocinándose mientras se enfría fuera del horno.",
        "Enfria completamente antes de cortar."
      ],
      "tip": "No los hornees de mas -- un brownie perfecto se ve poco hecho al sacarlo.",
      "personalize": "Una pizca de cafe soluble intensifica el sabor a chocolate.",
      "storage": "Temp. ambiente 3 dias. Refrigeracion 1 semana. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 160°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa moldes individuales o un molde pequeño apto para air fryer -- el espacio de cocción es menor que en un horno, así que no repliques el molde grande de la versión al horno. Cocina a 160°C durante 18-20 min, revisando desde el primer tercio del tiempo -- el calor directo del air fryer suele acelerar el dorado de la superficie. Verifica el punto de cocción con un palillo en el centro: debe salir limpio (o con humedad controlada, según lo que indique la receta específica).",
      "chef_ai": [
        "Puedo hacerlos sin mantequilla?",
        "Como los hago mas fudgy?",
        "No tengo alulosa, que uso?"
      ],
      "sugar_note": "La alulosa granulada usada aquí es opcional — puedes sustituirla por azúcar regular en la misma cantidad si lo prefieres. Ambas opciones funcionan bien en esta receta."
    },
    {
      "name": "2. Galletas con Chispas de Chocolate",
      "source": null,
      "intro": "Bordes crujientes, centro suave -- el estandar de cualquier galleta, sin harina de trigo ni azucar refinada.",
      "info": [
        "Prep 15 min",
        "Horneado 10-12 min",
        "Rinde 16 galletas"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "180 g harina de almendra blanqueada",
            "40 g harina de avena certificada sin gluten",
            "70 g alulosa granulada",
            "5 g polvo para hornear",
            "1 pizca de sal"
          ]
        ],
        [
          "Humedos",
          [
            "1 huevo",
            "60 g mantequilla derretida",
            "5 ml extracto de vainilla"
          ]
        ],
        [
          "Acabado",
          [
            "80 g chispas de chocolate negro sin azucar"
          ]
        ]
      ],
      "steps": [
        "Precalienta a 175 C.",
        "Mezcla los secos.",
        "Bate el huevo con la mantequilla y la vainilla.",
        "Une ambas mezclas.",
        "Incorpora las chispas.",
        "Forma bolitas, aplanalas y colocalas separadas.",
        "Hornea 10-12 min, hasta dorar en los bordes.",
        "Enfria 5 min sobre la bandeja antes de mover."
      ],
      "tip": "La harina de almendra dora mas rapido que la de trigo -- revisa desde el minuto 9.",
      "personalize": "Arandanos secos sin azucar and ralladura de naranja.",
      "storage": "Temp. ambiente 1 semana. Congelacion 2 meses (masa cruda u horneadas).",
      "airfryer": "Precalienta la air fryer a 160°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa moldes individuales o un molde pequeño apto para air fryer -- el espacio de cocción es menor que en un horno, así que no repliques el molde grande de la versión al horno. Cocina a 160°C durante 8-10 min, revisando desde el primer tercio del tiempo -- el calor directo del air fryer suele acelerar el dorado de la superficie. Verifica el punto de cocción con un palillo en el centro: debe salir limpio (o con humedad controlada, según lo que indique la receta específica).",
      "chef_ai": [
        "Por que se me desarman al levantarlas?",
        "Puedo usar mantequilla de mani?",
        "Quiero una version vegana"
      ],
      "sugar_note": "La alulosa granulada usada aquí es opcional — puedes sustituirla por azúcar regular en la misma cantidad si lo prefieres. Ambas opciones funcionan bien en esta receta."
    },
    {
      "name": "3. Muffins de Almendra y Yogur",
      "source": null,
      "intro": "Humedos y esponjosos, con toque acido del yogur griego que equilibra el dulzor.",
      "info": [
        "Prep 15 min",
        "Horneado 20-22 min",
        "Rinde 10-12 muffins"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "180 g harina de almendra blanqueada",
            "60 g harina de avena certificada sin gluten",
            "70 g alulosa granulada",
            "10 g polvo para hornear",
            "1 pizca de sal"
          ]
        ],
        [
          "Humedos",
          [
            "3 huevos",
            "70 ml yogur griego natural",
            "50 ml aceite de coco derretido",
            "5 ml extracto de vainilla"
          ]
        ]
      ],
      "steps": [
        "Precalienta a 175 C, coloca capacillos.",
        "Mezcla los secos.",
        "Bate huevos, yogur, aceite y vainilla.",
        "Une ambas mezclas sin batir de mas.",
        "Rellena capacillos hasta 2/3.",
        "Hornea 20-22 min, hasta palillo limpio."
      ],
      "tip": "No abras el horno antes del minuto 18 o pueden hundirse.",
      "personalize": "Arandanos frescos, ralladura de limon o canela.",
      "storage": "Temp. ambiente 3 dias. Refrigeracion 1 semana. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 160°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa moldes individuales o un molde pequeño apto para air fryer -- el espacio de cocción es menor que en un horno, así que no repliques el molde grande de la versión al horno. Cocina a 160°C durante 14-16 min, revisando desde el primer tercio del tiempo -- el calor directo del air fryer suele acelerar el dorado de la superficie. Verifica el punto de cocción con un palillo en el centro: debe salir limpio (o con humedad controlada, según lo que indique la receta específica).",
      "chef_ai": [
        "Puedo hacerlos sin lacteos?",
        "Como evito que se hundan?",
        "Quiero una version de chocolate"
      ],
      "sugar_note": "La alulosa granulada usada aquí es opcional — puedes sustituirla por azúcar regular en la misma cantidad si lo prefieres. Ambas opciones funcionan bien en esta receta."
    },
    {
      "name": "4. Torta de Zanahoria",
      "source": null,
      "intro": "Especiada y humeda, con trocitos de zanahoria y nuez en cada bocado.",
      "info": [
        "Prep 20 min",
        "Horneado 40-45 min",
        "Rinde 10 porciones",
        "Molde 22 cm"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "180 g harina de almendra blanqueada",
            "50 g harina de avena certificada sin gluten",
            "70 g alulosa granulada",
            "10 g polvo para hornear",
            "5 g canela",
            "2 g nuez moscada",
            "1 pizca de sal"
          ]
        ],
        [
          "Humedos",
          [
            "3 huevos",
            "60 ml aceite de coco o de oliva suave",
            "200 g zanahoria rallada",
            "5 ml extracto de vainilla"
          ]
        ],
        [
          "Opcional",
          [
            "40 g nueces picadas",
            "30 g uvas pasas"
          ]
        ]
      ],
      "steps": [
        "Precalienta a 175 C.",
        "Mezcla los secos con las especias.",
        "Bate huevos, aceite y vainilla.",
        "Incorpora la zanahoria rallada.",
        "Une secos y humedos, agrega nueces and pasas.",
        "Hornea 40-45 min, hasta palillo limpio.",
        "Enfria completamente antes de desmoldar."
      ],
      "tip": "Ralla la zanahoria fina -- trozos grandes pueden dejar el centro crudo.",
      "personalize": "Glaseado de queso crema y alulosa para version festiva.",
      "storage": "Refrigeracion 6 dias. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 160°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa moldes individuales o un molde pequeño apto para air fryer -- el espacio de cocción es menor que en un horno, así que no repliques el molde grande de la versión al horno. Cocina a 160°C durante 30-32 min, revisando desde el primer tercio del tiempo -- el calor directo del air fryer suele acelerar el dorado de la superficie. Verifica el punto de cocción con un palillo en el centro: debe salir limpio (o con humedad controlada, según lo que indique la receta específica).",
      "chef_ai": [
        "Como hago el glaseado sin azucar?",
        "Puedo usar calabacin en vez de zanahoria?"
      ],
      "sugar_note": "La alulosa granulada usada aquí es opcional — puedes sustituirla por azúcar regular en la misma cantidad si lo prefieres. Ambas opciones funcionan bien en esta receta."
    },
    {
      "name": "5. Cheesecake Horneado",
      "source": null,
      "intro": "Cremoso y denso, con base crujiente de almendra.",
      "info": [
        "Prep 25 min",
        "Horneado 45-50 min",
        "Reposo en frio 4h min.",
        "Rinde 10 porciones",
        "Molde 22 cm desmontable"
      ],
      "ingredients": [
        [
          "Base",
          [
            "180 g harina de almendra blanqueada",
            "40 g mantequilla derretida",
            "25 g alulosa granulada",
            "Canela al gusto (opcional)"
          ]
        ],
        [
          "Relleno",
          [
            "500 g queso crema a temp. ambiente",
            "150 g yogur griego natural",
            "80 g alulosa",
            "3 huevos",
            "15 ml extracto de vainilla",
            "Ralladura de 1 limon"
          ]
        ]
      ],
      "steps": [
        "Precalienta a 160 C.",
        "Mezcla la base y presiona en el fondo del molde. Hornea 10 min, enfria.",
        "Bate el queso crema con la alulosa hasta suavizar.",
        "Agrega los huevos uno a uno, batiendo apenas.",
        "Incorpora yogur, vainilla y ralladura.",
        "Vierte sobre la base, hornea 45-50 min, con ligero temblor en el centro.",
        "Enfria a temp. ambiente, luego refrigera minimo 4 horas."
      ],
      "tip": "El temblor del centro al sacarlo es senal de que esta bien hecho, no de que falta coccion.",
      "personalize": "Frutos rojos frescos o chocolate negro rallado antes de servir.",
      "storage": "Refrigeracion 5 dias. Congelacion 1 mes (sin cobertura).",
      "airfryer": "No recomendado para air fryer. Esta preparación necesita el control de temperatura estable y el espacio de un horno tradicional para que el centro cuaje bien sin que los bordes se quemen -- usa la versión de horno para esta receta.",
      "chef_ai": [
        "Se me agrieto, que hice mal?",
        "Puedo hacerlo sin horno?",
        "Como lo hago de chocolate?"
      ],
      "sugar_note": "La alulosa usada aquí es opcional — puedes sustituirla por azúcar regular en la misma cantidad si lo prefieres. Ambas opciones funcionan bien en esta receta."
    },
    {
      "name": "6. Flan Casero",
      "source": null,
      "intro": "Suave y cremoso, con su capa de caramelo caracteristica.",
      "info": [
        "Prep 15 min",
        "Horneado a bano maria 45-50 min",
        "Reposo en frio 4h min.",
        "Rinde 6 porciones"
      ],
      "ingredients": [
        [
          "Flan",
          [
            "500 ml leche o bebida vegetal sin azucar",
            "4 huevos",
            "70 g alulosa granulada",
            "10 ml extracto de vainilla"
          ]
        ],
        [
          "Caramelo",
          [
            "40 g alulosa",
            "30 ml agua"
          ]
        ]
      ],
      "steps": [
        "Prepara el caramelo calentando la alulosa con agua sin remover, hasta dorar. Vierte en el molde de inmediato.",
        "Precalienta a 160 C.",
        "Calienta la leche hasta que humee, sin herver.",
        "Bate los huevos con la alulosa y vainilla.",
        "Vierte la leche caliente sobre los huevos poco a poco, batiendo.",
        "Cuela y vierte sobre el caramelo.",
        "Coloca el molde en bano maria.",
        "Hornea 45-50 min, con ligero temblor en el centro.",
        "Enfria y refrigera minimo 4 horas antes de desmoldar."
      ],
      "tip": "No dejes de vigilar el caramelo -- pasa de listo a quemado en segundos.",
      "personalize": "Ralladura de naranja o cafe en la mezcla de leche.",
      "storage": "Refrigeracion 4 dias.",
      "airfryer": "No recomendado para air fryer. El baño maría que requiere esta receta necesita el espacio y la estabilidad de temperatura de un horno tradicional -- usa la versión de horno para esta receta.",
      "chef_ai": [
        "Se me cristalizo el caramelo, que hago?",
        "Puedo hacerlo sin lacteos?",
        "Como evito que tenga burbujas?"
      ],
      "sugar_note": "La alulosa usada aquí es opcional — puedes sustituirla por azúcar regular en la misma cantidad si lo prefieres. Ambas opciones funcionan bien en esta receta."
    },
    {
      "name": "7. Tarta de Limon",
      "source": null,
      "intro": "Acida y cremosa, contraste perfecto entre base crujiente y relleno suave.",
      "info": [
        "Prep 20 min",
        "Horneado 30-35 min",
        "Reposo en frio 2h min.",
        "Rinde 8-10 porciones",
        "Molde 22 cm"
      ],
      "ingredients": [
        [
          "Base",
          [
            "180 g harina de almendra blanqueada",
            "40 g mantequilla derretida",
            "30 g alulosa granulada",
            "1 pizca de sal"
          ]
        ],
        [
          "Relleno",
          [
            "3 huevos",
            "180 ml yogur griego natural",
            "80 g alulosa",
            "Jugo de 2 limones",
            "Ralladura de 2 limones",
            "5 ml extracto de vainilla"
          ]
        ]
      ],
      "steps": [
        "Precalienta a 175 C.",
        "Mezcla la base, presiona en el molde. Hornea 10 min, enfria.",
        "Baja el horno a 160 C.",
        "Bate los huevos con la alulosa.",
        "Incorpora yogur, jugo, ralladura y vainilla.",
        "Vierte sobre la base, hornea 20-25 min con ligero temblor central.",
        "Enfria y refrigera minimo 2 horas."
      ],
      "tip": "Ralla los limones antes de exprimirlos -- mucho mas facil.",
      "personalize": "Decora con merengue (claras + alulosa) dorado con soplete.",
      "storage": "Refrigeracion 4 dias.",
      "airfryer": "Precalienta la air fryer a 160°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa moldes individuales o un molde pequeño apto para air fryer -- el espacio de cocción es menor que en un horno, así que no repliques el molde grande de la versión al horno. Cocina a 160°C durante 22-25 min, revisando desde el primer tercio del tiempo -- el calor directo del air fryer suele acelerar el dorado de la superficie. Verifica el punto de cocción con un palillo en el centro: debe salir limpio (o con humedad controlada, según lo que indique la receta específica).",
      "chef_ai": [
        "Como hago el merengue para decorarla?",
        "Puedo usar lima en vez de limon?",
        "Me quedo muy liquida, que ajusto?"
      ],
      "sugar_note": "La alulosa usada aquí es opcional — puedes sustituirla por azúcar regular en la misma cantidad si lo prefieres. Ambas opciones funcionan bien en esta receta."
    },
    {
      "name": "8. Pan de Platano (Banana Bread)",
      "source": null,
      "intro": "Humedo, dulce de forma natural gracias al platano maduro, con toque de canela.",
      "info": [
        "Prep 15 min",
        "Horneado 40-45 min",
        "Rinde 10 rebanadas",
        "Molde 22x10 cm"
      ],
      "ingredients": [
        [
          "Secos",
          [
            "180 g harina de almendra blanqueada",
            "60 g harina de avena certificada sin gluten",
            "50 g alulosa granulada",
            "10 g polvo para hornear",
            "5 g canela",
            "1 pizca de sal"
          ]
        ],
        [
          "Humedos",
          [
            "3 platanos bien maduros, machacados",
            "3 huevos",
            "50 ml aceite de coco derretido",
            "5 ml extracto de vainilla"
          ]
        ],
        [
          "Opcional",
          [
            "40 g nueces picadas",
            "40 g chocolate negro picado"
          ]
        ]
      ],
      "steps": [
        "Precalienta a 175 C.",
        "Machaca los platanos.",
        "Bate huevos, aceite y vainilla, incorpora el platano.",
        "Mezcla los secos y une con los humedos.",
        "Agrega nueces y chocolate si quieres.",
        "Hornea 40-45 min, hasta palillo limpio."
      ],
      "tip": "Entre mas maduro el platano (con manchas negras), menos endulzante necesitas.",
      "personalize": "Ralladura de naranja o coco rallado.",
      "storage": "Temp. ambiente 2 dias. Refrigeracion 1 semana. Congelacion 2 meses.",
      "airfryer": "Precalienta la air fryer a 160°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa moldes individuales o un molde pequeño apto para air fryer -- el espacio de cocción es menor que en un horno, así que no repliques el molde grande de la versión al horno. Cocina a 160°C durante 30-32 min, revisando desde el primer tercio del tiempo -- el calor directo del air fryer suele acelerar el dorado de la superficie. Verifica el punto de cocción con un palillo en el centro: debe salir limpio (o con humedad controlada, según lo que indique la receta específica).",
      "chef_ai": [
        "Puedo usar platano congelado?",
        "Como lo hago mas denso, tipo bizcocho?"
      ],
      "sugar_note": "La alulosa granulada usada aquí es opcional — puedes sustituirla por azúcar regular en la misma cantidad si lo prefieres. Ambas opciones funcionan bien en esta receta."
    },
    {
      "name": "9. Crumble de Manzana",
      "source": null,
      "intro": "Manzanas suaves y especiadas debajo, cubierta crujiente de almendra y nuez arriba.",
      "info": [
        "Prep 20 min",
        "Horneado 35-40 min",
        "Rinde 6-8 porciones",
        "Molde 20x20 cm"
      ],
      "ingredients": [
        [
          "Relleno",
          [
            "4 manzanas medianas en cubos",
            "40 g alulosa",
            "5 g canela",
            "Jugo de 1/2 limon",
            "5 ml extracto de vainilla"
          ]
        ],
        [
          "Crumble",
          [
            "120 g harina de almendra blanqueada",
            "50 g harina de avena certificada sin gluten",
            "40 g mantequilla fria en cubos",
            "30 g alulosa",
            "30 g nueces picadas",
            "1 pizca de sal"
          ]
        ]
      ],
      "steps": [
        "Precalienta a 180 C.",
        "Mezcla las manzanas con alulosa, canela, limon y vainilla. Coloca en el molde.",
        "Mezcla harina, alulosa, sal y nueces. Incorpora la mantequilla fria con los dedos hasta migas gruesas.",
        "Distribuye el crumble sobre las manzanas.",
        "Hornea 35-40 min, hasta dorar y burbujear.",
        "Reposa 10 min antes de servir."
      ],
      "tip": "Manten la mantequilla bien fria hasta el final para lograr textura de migas.",
      "personalize": "Sustituye por pera, o mezcla ambas frutas.",
      "storage": "Refrigeracion 4 dias -- recalienta antes de servir.",
      "airfryer": "Precalienta la air fryer a 170°C durante 3-4 minutos antes de introducir la preparación -- saltarte el precalentamiento es la causa más común de que un air fryer no cocine parejo. Usa moldes individuales o un molde pequeño apto para air fryer -- el espacio de cocción es menor que en un horno, así que no repliques el molde grande de la versión al horno. Cocina a 170°C durante 25-28 min, revisando desde el primer tercio del tiempo -- el calor directo del air fryer suele acelerar el dorado de la superficie. Verifica el punto de cocción con un palillo en el centro: debe salir limpio (o con humedad controlada, según lo que indique la receta específica).",
      "chef_ai": [
        "Puedo usar durazno en vez de manzana?",
        "Me quedo muy liquido, que hago diferente?"
      ],
      "sugar_note": "La alulosa usada aquí es opcional — puedes sustituirla por azúcar regular en la misma cantidad si lo prefieres. Ambas opciones funcionan bien en esta receta."
    },
    {
      "name": "10. Mousse de Chocolate",
      "source": null,
      "intro": "Tres ingredientes principales, sin horno, lista en minutos.",
      "info": [
        "Prep 15 min",
        "Sin horno",
        "Reposo en frio 2h min.",
        "Rinde 6 porciones"
      ],
      "ingredients": [
        [
          "Ingredientes",
          [
            "200 g chocolate negro (70%+)",
            "250 ml crema para batir fria",
            "40 g alulosa pulverizada",
            "5 ml extracto de vainilla",
            "1 pizca de sal"
          ]
        ]
      ],
      "steps": [
        "Derrite el chocolate a bano maria o microondas en intervalos. Deja entibiar.",
        "Bate la crema fria con alulosa y vainilla hasta picos suaves.",
        "Incorpora un tercio de la crema al chocolate, mezclando energico.",
        "Agrega el resto de la crema con movimientos envolventes.",
        "Reparte en copas individuales.",
        "Refrigera minimo 2 horas."
      ],
      "tip": "Si el chocolate esta muy caliente al mezclar con la crema, se derrite y pierde el aire.",
      "personalize": "Sirve con frutos rojos frescos o sal en escamas.",
      "storage": "Refrigeracion 3 dias.",
      "airfryer": "No aplica -- receta sin horno.",
      "chef_ai": [
        "Se me corto la mezcla, que paso?",
        "Puedo hacerlo sin lacteos?",
        "Como lo hago mas intenso de chocolate?"
      ],
      "sugar_note": "La alulosa pulverizada usada aquí es opcional — puedes sustituirla por azúcar regular en la misma cantidad si lo prefieres. Ambas opciones funcionan bien en esta receta."
    },
    {
      "name": "11. “Helado” de Yogur Griego",
      "source": null,
      "intro": "Cremoso y refrescante -- sin maquina de helados, solo batir y congelar.",
      "info": [
        "Prep 10 min",
        "Sin horno",
        "Congelacion 6 horas",
        "Rinde 6 porciones"
      ],
      "ingredients": [
        [
          "Helado",
          [
            "500 g yogur griego natural",
            "200 ml crema para batir",
            "60 g alulosa pulverizada",
            "5 ml extracto de vainilla"
          ]
        ],
        [
          "Opcional",
          [
            "Frutas frescas, chocolate negro picado, nueces, coco rallado"
          ]
        ]
      ],
      "steps": [
        "Bate el yogur con la alulosa y vainilla.",
        "Bate la crema hasta picos suaves.",
        "Incorpora la crema al yogur con movimientos envolventes.",
        "Agrega ingredientes opcionales si quieres.",
        "Vierte en recipiente apto para congelador.",
        "Congela 6 horas, removiendo cada hora durante las primeras 3.",
        "Retira 10 min antes de servir para que se ablande."
      ],
      "tip": "Remover cada hora durante las primeras 3 marca la diferencia entre cremoso y bloque de hielo.",
      "personalize": "Pure de fresas, cacao en polvo, o trocitos de chocolate antes de congelar.",
      "storage": "Congelacion 2 meses.",
      "airfryer": "No aplica -- requiere congelacion.",
      "chef_ai": [
        "Como lo hago de chocolate?",
        "Que frutas funcionan mejor?",
        "Puedo hacerlo sin crema para batir?"
      ],
      "sugar_note": "La alulosa pulverizada usada aquí es opcional — puedes sustituirla por azúcar regular en la misma cantidad si lo prefieres. Ambas opciones funcionan bien en esta receta."
    }
  ]
};
