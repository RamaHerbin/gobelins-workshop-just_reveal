import {Howl, Howler} from 'howler';

export const EVENTS = [
  // {
  //   "date": "2019/12/10",
  //   "country": "Kenya",
  //   "localisation": { "lat": -1.2920659, "long": 36.8219463 },
  //   "description": "Après cinq ans de sécheresse, une région du Kenya obtient enfin de l'eau potable grâce à une usine d'eau salée à énergie solaire.",
  //   "source": "Good News Network : https://www.goodnewsnetwork.org/kenyan-region-finally-gets-clean-water-through-solar-powered-plant/",
  //   "type": "environnement",
  //   "continent": "Afrique",
  //   "sound": ""
  // },
  {
    "date": "2020/01/12",
    "country": "Sénégal",
    "localisation": { "lat": 14.497401, "long": -14.452362 },
    "description": "Le Sénégal se prépare à franchir une étape importante sur le marché émergent des énergies renouvelables africaines avec la construction du parc éolien Taliba N'diaye à 340 millions d'euros.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/wind-farms-in-africa-aim-for-new-era-of-clean-energy-saving-billion-tons-of-co2/",
    "type": "environnement",
    "continent": "Afrique",
    "sound": "1"
  },
  {
    "date": "2020/03/29",
    "country": "Madagascar",
    "localisation": { "lat": -18.766947, "long": 46.869107 },
    "description": "Pour célébrer son 60e anniversaire, le Madagascar a organisé sa plus grande cérémonie de plantation d'arbres jamais organisée, avec le millionième arbre planté quelques heures après la fin des discours.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/madagascar-to-plant-60-million-trees-for-birthday/",
    "type": "environnement",
    "continent": "Afrique",
    "sound": "2"
  },
  {
    "date": "2021/11/06",
    "country": "Cameroun",
    "localisation": { "lat": 7.369722, "long": 12.354722 },
    "description": "Des réfugiés au Cameroun ont transformé un terrain désertique en une grand forêt.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/refugees-in-cameroon-have-turned-a-treeless-desert-camp-into-a-thriving-forest/",
    "type": "environnement",
    "continent": "Afrique",
    "sound": "3"
  },
  {
    "date": "2020/11/19",
    "country": "États-Unis",
    "localisation": { "lat": 37.7576793, "long": -122.5076402 },
    "description": "Novembre 2020, San Francisco bannit le gaz naturel de ses nouveaux batiments et le remplace par de l'électricité verte.",
    "source": "Ouest France : https://www.ouest-france.fr/environnement/rechauffement-climatique/san-francisco-bannit-le-gaz-naturel-et-privilegie-l-electricite-verte-7056945",
    "type": "environnement",
    "continent": "Amérique du Nord",
    "sound": ""
  },
  {
    "date": "2022/09/14",
    "country": "Mexique",
    "localisation": { "lat": 23.634501, "long": -102.552784 },
    "description": "Le premier grand sentier de randonnée à travers le Mexique célébrera la culture maya.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/support-mayan-history-and-culture-on-mexicos-first-long-distance-hiking-cycling-trail/",
    "type": "environnement",
    "continent": "Amérique du Nord",
    "sound": "audio_ai_09"
  },
  {
    "date": "2020/01/14",
    "country": "Pérou",
    "localisation": { "lat": -9.189967, "long": -75.015152 },
    "description": "Le Pérou protège le Machu Picchu en plantant un million d'arbres pour se protéger contre les coulées de boue et les incendies.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/peru-planting-million-trees-around-machu-picchu/",
    "type": "environnement",
    "continent": "Amérique du Sud",
    "sound": ""
  },
  {
    "date": "2020/07/13",
    "country": "Colombie",
    "localisation": { "lat": 4.577316, "long": -74.298973 },
    "description": "D'anciens guérilleros se transforment en scientifiques bénévoles en utilisant leur connaissance de la jungle colombienne pour protéger la biodiversité.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/former-colombian-guerrillas-trained-to-protect-biodiversity/",
    "type": "environnement",
    "continent": "Amérique du Sud",
    "sound": ""
  },
  {
    "date": "2021/11/13",
    "country": "Îles Galápagos",
    "localisation": { "lat": -0.382548, "long": -90.42491 },
    "description": "Une extension de la zone protégée autour des îles Galápagos a été annoncée par le président de l'Equateur.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/ecuador-expands-marine-protection-by-15m-acres/",
    "type": "environnement",
    "continent": "Amérique du Sud",
    "sound": ""
  },
  {
    "date": "2020/04/07",
    "country": "Inde",
    "localisation": { "lat": 28.5982312, "long": 83.9326553 },
    "description": "L’Himalaya, habituellement caché par un nuage de pollution, peut à nouveau être vu à plus de 200km depuis plusieurs endroits des plaines de l’Inde, chose qui n’était pas arrivée depuis plus de 30 ans.",
    "source": "SBS : https://www.sbs.com.au/language/hindi/en/podcast-episode/himalayas-visible-for-first-time-in-30-years-as-pollution-levels-in-india-drop/njr226v6n",
    "type": "environnement",
    "continent": "Asie",
    "sound": "audio_ai_04"
  },
  {
    "date": "2020/10/17",
    "country": "Singapour",
    "localisation": { "lat": 1.352083, "long": 103.819836 },
    "description": "Singapour prévoit de planter 1 million d'arbres et de construire des parcs à 10 minutes de chaque citoyen.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/singapore-to-plant-1-million-trees-bringing-parks-to-people/",
    "type": "environnement",
    "continent": "Asie",
    "sound": ""
  },
  {
    "date": "2021/07/10",
    "country": "Indonésie",
    "localisation": { "lat": -2.518722, "long": 118.015568 },
    "description": "De précieuses forêts tropicales sont préservées au taux le plus élevé en 30 ans, après le moratoire sur l'huile de palme en Indonésie.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/indonesia-cuts-deforestation-rates-by-75-year-over-year/",
    "type": "environnement",
    "continent": "Asie",
    "sound": "audio_ai_15"
  },
  {
    "date": "2022/06/11",
    "country": "Irak",
    "localisation": { "lat": 32.056245, "long": 43.994751 },
    "description": "Des archéologues allemands et kurdes ont découvert une ancienne métropole de l'empire Mittani sous le fleuve duTigre.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/drought-reveals-stunning-3400-year-old-city-covered-by-tigris-river/",
    "type": "environnement",
    "continent": "Asie",
    "sound": "audio_ai_12"
  },
  {
    "date": "2022/10/10",
    "country": "Palestine",
    "localisation": { "lat": 31.952162, "long": 35.233154 },
    "description": "Un sol en mosaïque de carreaux extrêmement bien préservé, représentant des oiseaux et d'autres animaux, a été découvert sous un champ de Gaza.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/exquisite-mosaic-unearthed-by-farmer-planting-olive-tree-perfectly-preserved-from-byzantine-era/",
    "type": "environnement",
    "continent": "Asie",
    "sound": ""
  },
  {
    "date": "2021/02/21",
    "country": "Danemark",
    "localisation": { "lat": 56.2097981, "long": 9.300227 },
    "description": "Le Danemark va construire la première île artificielle dédiée à la diffusion de l’énergie renouvelable collectée sur le parc éolien offshore en mer du Nord.",
    "source": "Futura Science : https://www.futura-sciences.com/planete/actualites/energie-renouvelable-danemark-va-construire-premiere-ile-eolienne-artificielle-monde-85845/",
    "type": "environnement",
    "continent": "Europe",
    "sound": "audio_ai_17"
  },
  {
    "date": "2021/11/23",
    "country": "Portugal",
    "localisation": { "lat": 39.460463, "long": -8.146233 },
    "description": "Le Portugal ferme sa dernière centrale à charbon avec 9 ans d'avance suite à la COP26",
    "source": "L'info durable : https://www.linfodurable.fr/environnement/energie-le-portugal-ferme-sa-derniere-centrale-charbon-29839",
    "type": "environnement",
    "continent": "Europe",
    "sound": "audio_ai_11"
  },
  {
    "date": "2021/12/17",
    "country": "Costa Rica",
    "localisation": { "lat": 10.248821, "long": -84.26208 },
    "description": "Le Costa Rica annonce vouloir étendre de 2,7 % à 30 % la zone de protection de ses eaux territoriales.",
    "source": "Conservation.org : https://www.conservation.org/blog/in-historic-move-costa-rica-makes-big-splash-for-conservation",
    "type": "environnement",
    "continent": "Europe",
    "sound": ""
  },
  // {
  //   "date": "2022/01/01",
  //   "country": "France",
  //   "localisation": { "lat": 46.1313542, "long": -2.4365078 },
  //   "description": "La France interdit la production d'emballages ou de sacs fabriqués à partir de plastique oxodégradable et\nla vente au détail de certains fruits et légumes frais sous conditionnement plastique en-dessous de 1,5 kg.",
  //   "source": "Ministère de l'économie des finances et de la souveraineté industrielle et numérique https://www.economie.gouv.fr/cedef/interdiction-plastique-usage-unique",
  //   "type": "environnement",
  //   "continent": "Europe",
  //   "sound": "audio_ai_06"
  // },
  // {
  //   "date": "2022/01/18",
  //   "country": "Écosse",
  //   "localisation": { "lat": 56.8609946, "long": -4.2388356 },
  //   "description": "L'Écosse vient de procéder à la plus grosse mise aux enchères d’éolien offshore au monde : 25 gigawatts ont été attribués, soit plus du tiers du parc nucléaire français, tandis que le pays est au plus près de son objectif d'utilisation à 100% d'énergie renouvelable.",
  //   "source": "Le Monde : https://www.lemonde.fr/economie/article/2022/01/18/eolien-en-ecosse-les-energies-renouvelables-c-est-maintenant-et-massivement_6109926_3234.html",
  //   "type": "environnement",
  //   "continent": "Europe",
  //   "sound": "audio_ai_05"
  // },
  {
    "date": "2022/06/01",
    "country": "Allemagne",
    "localisation": { "lat": 50.896349, "long": 10.407737 },
    "description": "L'Allemagne lance un ticket de transports en commun à 9 euros par mois. Cette mesure est si positive pour l'environnement que pour janvier 2023, par mois, tous les transports en commun exceptés les grandes lignes, seront ouvertes au public à 49 euros par mois.",
    "source": "TF1 : https://www.tf1info.fr/societe/allemagne-le-train-illimite-a-prix-casse-9-euros-a-t-il-permis-de-faire-chuter-de-10-le-trafic-automobile-cet-ete-2237640.html",
    "type": "environnement",
    "continent": "Europe",
    "sound": "audio_ai_08"
  },
  {
    "date": "2022/09/24",
    "country": "Royaume-Uni",
    "localisation": { "lat": 54.2184924, "long": -13.4306024 },
    "description": "Le Royaume Uni planifie de planter des mini-jardins pour abeilles et papillons sur plus de 1000 stations de bus. Cette idée se popularise dans plusieurs pays d'Europe comme la France et la Belgique.",
    "source": "The Guardian : https://www.theguardian.com/environment/2022/sep/24/bus-shelter-roofs-turned-into-gardens-for-bees-butterflies-aoe",
    "type": "environnement",
    "continent": "Europe",
    "sound": "audio_ai_02"
  },
  {
    "date": "2022/08/08",
    "country": "Australie",
    "localisation": { "lat": -33.868857, "long": 151.206079 },
    "description": "Des parties de la Grande Barrière de corail d'Australie comptent d'avantage de coraux, pour la première fois depuis des décennies, selon un rapport du gouvernement.",
    "source": "Euronews : https://fr.euronews.com/green/2022/08/08/de-lespoir-pour-la-grande-barriere-de-corail-australienne",
    "type": "environnement",
    "continent": "Océanie",
    "sound": "audio_ai_03"
  },
  {
    "date": "2020/08/02",
    "country": "Afrique du Sud",
    "localisation": { "lat": -30.559482, "long": 22.937506 },
    "description": "Le braconnage des rhinocéros chute de 53 % pendant le confinement.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/rhino-poaching-down-53pt-in-south-africa-continuing-positive-trend/",
    "type": "faune",
    "continent": "Afrique",
    "sound": "Rhino.wav"
  },
  {
    "date": "2020/08/18",
    "country": "Djibouti",
    "localisation": { "lat": 11.825138, "long": 42.590275 },
    "description": "Une minuscule espèce de musaraigne éléphant, disparue depuis 50 ans, redécouverte en grande quantité.",
    "source": "The Guardian : https://www.theguardian.com/environment/2020/aug/18/tiny-elephant-shrew-species-missing-for-50-years-rediscovered",
    "type": "faune",
    "continent": "Afrique",
    "sound": ""
  },
  {
    "date": "2021/10/16",
    "country": "République Démocratique du Congo",
    "localisation": { "lat": -4.038333, "long": 21.758664 },
    "description": "Une étude de la République Démocratique du Congo rapporte une grande augmentation de la population des gorilles de Grauer, qui étaient en danger critique d'extinction.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/2021-study-global-population-of-grauers-gorillas/",
    "type": "faune",
    "continent": "Afrique",
    "sound": "gorilla.mp3"
  },
  {
    "date": "2021/10/27",
    "country": "Ghana",
    "localisation": { "lat": 7.946527, "long": -1.023194 },
    "description": "Un type de hibou disparu depuis 150 ans refait surface au Ghana.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/giant-eagle-owl-unseen-for-150-years-just-caught-on-camera/",
    "type": "faune",
    "continent": "Afrique",
    "sound": "Owl.wav"
  },
  {
    "date": "2021/11/01",
    "country": "Cap-Vert",
    "localisation": { "lat": 16.0026, "long": -24.014095 },
    "description": "En 2021, Projeto Biodiversidade et Bios.CV, deux organisations engagées dans la protection de l’environnement, ont permis au Cap-Vert d’enregistrer un nouveau record de nids de tortue caouanne.",
    "source": "Ardenne Web : https://www.ardenneweb.eu/reportages/le-cap-vert-enregistre-un-nouveau-record-de-nidification-des-tortues-caouannes#:~:text=Le%20Cap%2DVert%20enregistre%20un%20nouveau%20record%20de%20nidification%20des%20tortues%20caouannes,-%C3%A9crit%20par%20VandenHende&text=En%202021%2C%20Projeto%20Biodiversidade%20et,tortue%20caouanne%20(Caretta%20caretta)",
    "type": "faune",
    "continent": "Afrique",
    "sound": "Turtle.wav"
  },
  {
    "date": "2020/06/22",
    "country": "Canada",
    "localisation": { "lat": 56.130366, "long": -106.346771 },
    "description": "Un chercheur du New Brunswick a redécouvert une espèce de crapaud arlequin présumée éteinte, et la découverte offre de l'espoir non seulement pour l'espèce, mais pour l'ensemble du genre atelopus, qui a été presque anéanti par une épidémie chez les amphibiens.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/extinct-harlequin-toad-rediscovered-such-survivors-are-bringing-hope-that-amphibian-apocalypse-is-abating/",
    "type": "faune",
    "continent": "Amérique du Sud",
    "sound": "Toad.mp3 + audio_ai_07"
  },
  {
    "date": "2021/12/07",
    "country": "Chili",
    "localisation": { "lat": -35.675147, "long": -71.542969 },
    "description": "Un fossile unique d'ankylosaure a été découvert dans le sud du Chili.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/new-blade-tail-weapon-on-an-ankylosaur-relative-stuns-scientists/",
    "type": "faune",
    "continent": "Amérique du Sud",
    "sound": ""
  },
  {
    "date": "2022/01/01",
    "country": "Équateur",
    "localisation": { "lat": -1.751485, "long": -78.54756 },
    "description": "L'Équateur devient le premier pays à attribuer des droits aux animaux sauvages.",
    "source": "30 millions d'amis : https://www.30millionsdamis.fr/actualites/article/22172-inedit-lequateur-reconnait-des-droits-aux-animaux-sauvages/",
    "type": "faune",
    "continent": "Amérique du Sud",
    "sound": ""
  },
  // {
  //   "date": "2019/09/27",
  //   "country": "Kazakhstan",
  //   "localisation": { "lat": 48.193764, "long": 66.902264 },
  //   "description": "Alors qu'ils avaient disparu depuis près de 100 ans dans les alentours du lac Balkhach, 5 cerfs ont été réintroduits par le WWF. L'ONG internationale espère repeupler le territoire pour servir un objectif encore plus ambitieux à l'avenir.",
  //   "source": "Novastan : https://novastan.org/fr/kazakhstan/kazakhstan-des-cerfs-de-boukhara-reintroduits-pres-du-lac-balkhach/",
  //   "type": "faune",
  //   "continent": "Asie",
  //   "sound": ""
  // },
  {
    "date": "2020/09/14",
    "country": "Myanmar",
    "localisation": { "lat": 21.916221, "long": 95.955974 },
    "description": "Des tortues rares connues pour leur sourire permanent sauvées de l'extinction au Myanmar.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/rare-smiling-turtles-saved-from-extinction-in-myanmar/",
    "type": "faune",
    "continent": "Asie",
    "sound": "Turtle.wav"
  },
  {
    "date": "2020/10/16",
    "country": "Hong Kong",
    "localisation": { "lat": 22.396428, "long": 114.109497 },
    "description": "A Hong Kong, les dauphins roses de retour avec la baisse du trafic maritime",
    "source": "Geo.fr : https://www.geo.fr/environnement/a-hong-kong-les-dauphins-roses-de-retour-avec-la-baisse-du-trafic-maritime-202509",
    "type": "faune",
    "continent": "Asie",
    "sound": "Dolphin"
  },
  {
    "date": "2022/07/29",
    "country": "Népal",
    "localisation": { "lat": 28.394857, "long": 4.124008 },
    "description": "La population des tigres sauvages du Népal a presque triplé en 12 ans.",
    "source": "SudOuest.fr : https://www.sudouest.fr/societe/animaux/la-population-des-tigres-sauvages-du-nepal-a-presque-triple-en-12-ans-11806718.php",
    "type": "faune",
    "continent": "Asie",
    "sound": ""
  },
  {
    "date": "2022/01/01",
    "country": "Italie",
    "localisation": { "lat": 40.9399763, "long": 3.7218338 },
    "description": "L'Italie bannit l'élevage et l'abattage d'animaux destinés à la production de fourrure.",
    "source": "Le Parisien : https://www.leparisien.fr/societe/litalie-interdit-les-elevages-destines-a-la-fourrure-28-12-2021-RJ3GX4MG2ZBWTJM3TSKITAROUI.php#:~:text=Le%20Parlement%20italien%20a%20d%C3%A9cid%C3%A9,juin%202022%20pour%20s'adapter.",
    "type": "faune",
    "continent": "Europe",
    "sound": "audio_ai_10"
  },
  {
    "date": "2022/10/16",
    "country": "Bulgarie",
    "localisation": { "lat": 42.6977082, "long": 23.3218675 },
    "description": "Réintroduction dans la nature de 8 vautours fauves pour la Bulgarie.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/70-vultures-released-into-bulgaria-to-rewild-population/",
    "type": "faune",
    "continent": "Europe",
    "sound": ""
  },
  {
    "date": "2022/11/25",
    "country": "Suisse",
    "localisation": { "lat": 46.818188, "long": 8.227512 },
    "description": "Des grenouilles en voie de disparition voient une explosion démographique après la construction de 422 étangs en Suisse.",
    "source": "Nature et Zoo : https://natureetzoo.fr/reintroduction-8-vautours-fauves-parc-sainte-croix-bulgarie/",
    "type": "faune",
    "continent": "Europe",
    "sound": ""
  },
  {
    "date": "2020/03/08",
    "country": "Antartique",
    "localisation": { "lat": -75.257716, "long": 0 },
    "description": "Des dizaines de baleines bleues identifiées en Antarctique pour la première fois depuis l'interdiction de la chasse à la baleine des années 1980.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/blue-whales-spotted-in-abundance-in-antarctica/",
    "type": "faune",
    "continent": "Antartique",
    "sound": ""
  },
  {
    "date": "2020/09/10",
    "country": "Soudan",
    "localisation": { "lat": 15.45847, "long": 30.217636 },
    "description": "Le Soudan annonce la séparation de l'Église et de l'État après 30 ans de règne religieux.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/for-sudan-separates-church-and-state-after-30-years-of-religious-rule/",
    "type": "politique",
    "continent": "Afrique",
    "sound": ""
  },
  {
    "date": "2021/11/04",
    "country": "Bangladesh",
    "localisation": { "lat": 23.684994, "long": 90.356331 },
    "description": "Pour réduire les tensions religieuses, le Bangladesh retire l'islam en tant que religion d'État et adopte la constitution laïque d'origine.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/bangladesh-plans-to-remove-islam-as-the-state-religion/",
    "type": "politique",
    "continent": "Asie",
    "sound": ""
  },
  {
    "date": "2022/06/16",
    "country": "Malaisie",
    "localisation": { "lat": 4.10932, "long": 109.455475 },
    "description": "Le gouvernement malaisien décide d'abolir partiellement la peine de mort, qui était jusqu'à ce jour appliquée à 33 catégories de crimes dont 11 passibles d'une peine systématique.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/malaysia-abolishes-mandatory-death-penalty-while-thailand-decriminalizes-cannabis/",
    "type": "politique",
    "continent": "Asie",
    "sound": ""
  },
  {
    "date": "2020/06/17",
    "country": "Ouganda",
    "localisation": { "lat": 1.373333, "long": 32.290275 },
    "description": "Une start-up en Ouganda recycle des bouteilles en plastique en écrans faciaux de protection pour les hôpitaux.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/startup-in-uganda-recycles-plastic-bottles-into-ppe/",
    "type": "santé",
    "continent": "Afrique",
    "sound": ""
  },
  {
    "date": "2020/06/18",
    "country": "Maroc",
    "localisation": { "lat": 31.791702, "long": -7.09262 },
    "description": "En signe de solidarité, le Maroc envoie 8 millions de masques à 15 pays africains.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/morocco-donates-8-million-masks-to-15-african-nations/",
    "type": "santé",
    "continent": "Afrique",
    "sound": ""
  },
  {
    "date": "2022/07/21",
    "country": "Botswana",
    "localisation": { "lat": -22.344029, "long": 24.680158 },
    "description": "Le Botswana réduit de 40% à 1% son taux de transmission du VIH aux enfants grâce à sa campagne nationale.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/botswana-cuts-mother-to-child-hiv-transmission-rates-to-1-groundbreaking-achievement/",
    "type": "santé",
    "continent": "Afrique",
    "sound": ""
  },
  {
    "date": "2020/06/02",
    "country": "Corée du Sud",
    "localisation": { "lat": 37.566535, "long": 126.9779692 },
    "description": "La Corée du Sud envoie 10 000 masques à la nation Navajo pour honorer leur service en tant que « Code Talkers » pendant la guerre de Corée.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/south-korea-sends-navajos-ppe-to-honor-code-talkers-of-korean-war/",
    "type": "santé",
    "continent": "Asie",
    "sound": "audio_ai_16"
  },
  {
    "date": "2021/07/03",
    "country": "Chine",
    "localisation": { "lat": 35.86166, "long": 104.195397 },
    "description": "De 30 millions d'infectés à zéro : la Chine est certifiée sans paludisme par l'Organisation mondiale de la santé.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/china-certified-malaria-free-by-world-health-organization/",
    "type": "santé",
    "continent": "Asie",
    "sound": "audio_ai_13"
  },
  {
    "date": "2020/08/13",
    "country": "Niger",
    "localisation": { "lat": 17.607789, "long": 8.081666 },
    "description": "Au Niger, un enfant s'est vu offrir une bourse d'étude complète dans une prestigieuse école de danse de Manhattan en dansant du ballet sous la pluie.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/nigerian-boy-wins-scholarship-after-dancing-in-rain/",
    "type": "social",
    "continent": "Afrique",
    "sound": ""
  },
  {
    "date": "2020/02/24",
    "country": "Canada",
    "localisation": { "lat": 56.130366, "long": -106.346771 },
    "description": "Le premier « village de la démence » au Canada aide à changer la façon dont les gens prennent soin des personnes âgées atteintes d'Alzheimer.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/canadas-first-dementia-village-opens-in-langley/",
    "type": "social",
    "continent": "Amérique du Nord",
    "sound": "audio_ai_01"
  },
  {
    "date": "2020/07/20",
    "country": "Alaska",
    "localisation": { "lat": 64.201618, "long": -149.492362 },
    "description": "En Alaska, une ville héberge tous ses sans-abris.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/anchorage-alaska-is-housing-its-homeless-2020-nicest-place-contest/",
    "type": "social",
    "continent": "Amérique du Nord",
    "sound": ""
  },
  {
    "date": "2020/06/01",
    "country": "Zimbabwe",
    "localisation": { "lat": -19.013286, "long": 29.146667 },
    "description": "Un homme du Zimbabwe crée 2 000 miles de Google Street Views après avoir découvert que sa ville natale y était totalement absente.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/zimbabwe-man-travels-2000-miles-to-map-home-for-google-street-view/",
    "type": "technologie",
    "continent": "Afrique",
    "sound": ""
  },
  {
    "date": "2020/06/07",
    "country": "Ghana",
    "localisation": { "lat": 7.788495, "long": -1.227077 },
    "description": "Un cordonnier ghanéen invente un lavabo à énergie solaire pendant le confinement pour encourager les habitudes sanitaires.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/ghanaian-brothers-invent-solar-powered-hand-washing-basin/",
    "type": "technologie",
    "continent": "Afrique",
    "sound": ""
  },
  {
    "date": "2021/11/29",
    "country": "Sierra Leone",
    "localisation": { "lat": 8.464806, "long": -11.795934 },
    "description": "Des jeunes salués pour avoir fourni de l'énergie renouvelable à 10 000 personnes sans utiliser de batterie, de vent, de soleil ou d'eau.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/optim-energy-wins-prize-for-renewable-energy-in-sierra-leone/",
    "type": "technologie",
    "continent": "Afrique",
    "sound": ""
  },
  {
    "date": "2020/07/22",
    "country": "Japon",
    "localisation": { "lat": 36.204824, "long": 138.252924 },
    "description": "Le Japon a lancé un nouveau train à grande vitesse équipé pour protéger les passagers contre les catastrophes naturelles.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/japans-new-bullet-train-designed-for-power-outage-in-natural-disasters/",
    "type": "technologie",
    "continent": "Asie",
    "sound": "audio_ai_14"
  },
  {
    "date": "2020/07/23",
    "country": "Afghanistan",
    "localisation": { "lat": 33.927125, "long": 67.721655 },
    "description": "Dans un lycée pour jeunes filles, une équipe d'ingénieures en robotique crée un ventilateur mobile bon marché pour aider l'Afghanistan à lutter contre le COVID-19.",
    "source": "Good News Network : https://www.goodnewsnetwork.org/all-girl-robotics-team-creates-ventilator-to-aid-afghan-covid-19-efforts/",
    "type": "technologie",
    "continent": "Asie",
    "sound": ""
  }
]
