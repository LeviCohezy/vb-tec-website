// IMAGES — te vervangen door echte VB-TEC fotografie:
//  - public/images/{aerial,charger,pvt,heatpump}.svg : effen brand-groene placeholders
//  - public/images/{hero-house,battery,inverter,meter,engineer,consult,installers}.jpg : tijdelijke stockbeelden
//  - Team-portretten: gekleurde tegels met initialen (zie components/Team.tsx)
// All copy for the site lives here so it can be edited without touching layout code.

export const site = {
  name: "VBTEC",
  email: "info@vbtec.be",
  phone: "+32 470 00 00 00",
  phoneHref: "tel:+32470000000",
  region: "Actief in heel Vlaanderen",
  address: "Vlaanderen, België",
};

export type ServiceKey = "zonnepanelen" | "thuisbatterij" | "omvormer" | "laadpaal" | "pvt" | "warmtepomp";

export const services: {
  key: ServiceKey;
  title: string;
  short: string;
  long: string;
  image: string;
  stat: string;
  statLabel: string;
}[] = [
  {
    key: "zonnepanelen",
    title: "Zonnepanelen",
    short: "Maximaal rendement, exact afgestemd op je dak en verbruik.",
    long: "Geen standaardpakket, maar een legplan op basis van oriëntatie, schaduw en jouw verbruiksprofiel. Zo leg je niet te veel en niet te weinig.",
    image: "/images/hero-house.jpg",
    stat: "± 6–8 j",
    statLabel: "gemiddelde terugverdientijd",
  },
  {
    key: "thuisbatterij",
    title: "Thuisbatterijen",
    short: "Bewaar je zonnestroom voor ’s avonds en verlaag je piek.",
    long: "Een batterij loont pas als ze juist gedimensioneerd is. Wij rekenen uit welke capaciteit bij jouw gezin past, zodat je geen euro te veel investeert.",
    image: "/images/battery.jpg",
    stat: "tot 70%",
    statLabel: "eigen verbruik van je zonnestroom",
  },
  {
    key: "omvormer",
    title: "Omvormers",
    short: "Het hart van je installatie: hybride, slim en toekomstklaar.",
    long: "We kiezen een omvormer die vandaag je panelen aanstuurt en morgen je batterij, laadpaal en warmtepomp kan integreren.",
    image: "/images/inverter.jpg",
    stat: "10+ j",
    statLabel: "fabrieksgarantie op A-merken",
  },
  {
    key: "laadpaal",
    title: "Laadpalen",
    short: "Laad je wagen slim en goedkoop met je eigen zonne-energie.",
    long: "Slimme laadpalen die laden wanneer de zon schijnt of de stroom goedkoop is, met correcte keuring en dimensionering van je aansluiting.",
    image: "/images/charger.svg",
    stat: "–60%",
    statLabel: "laadkost t.o.v. publiek laden",
  },
  {
    key: "pvt",
    title: "PVT-panelen",
    short: "Stroom én warmte uit één paneel — ideaal met een warmtepomp.",
    long: "PVT-panelen wekken elektriciteit op en leveren warmte aan je warmtepomp. Perfect voor woningen met beperkte dakruimte en een hoge warmtevraag.",
    image: "/images/pvt.svg",
    stat: "2–3×",
    statLabel: "meer energie per m² dak",
  },
  {
    key: "warmtepomp",
    title: "Warmtepompen",
    short: "Fossielvrij verwarmen, correct berekend op je woning.",
    long: "Een warmtepomp moet exact passen bij je isolatie en afgiftesysteem. Onze warmteverliesberekening voorkomt een te grote of te kleine installatie.",
    image: "/images/heatpump.svg",
    stat: "SCOP 4+",
    statLabel: "4 kWh warmte per kWh stroom",
  },
];

export const stats = [
  { value: 2300, suffix: "+", label: "Installaties opgeleverd" },
  { value: 8, suffix: "+", label: "Jaar ervaring" },
  { value: 4.9, suffix: "/5", label: "Gemiddelde klantscore", decimals: 1 },
  { value: 100, suffix: "%", label: "Ingenieursgestaafd" },
];

export const psa = [
  {
    tag: "Het probleem",
    title: "Je energiefactuur blijft stijgen. En de keuzes worden alleen maar complexer.",
    body: "Capaciteitstarief, dynamische contracten, terugdraaiende teller verdwenen. Wie vandaag investeert, moet rekenen — niet gokken.",
    points: ["Capaciteitstarief straft piekverbruik", "Injectievergoeding bijna nihil", "Tientallen merken, honderden offertes"],
  },
  {
    tag: "Wat als je niets doet?",
    title: "Een verkeerde installatie kost je méér dan geen installatie.",
    body: "Te grote batterijen die nooit vol raken. Omvormers die niet samenwerken. Warmtepompen die te klein zijn en in de winter bijverwarmen. Het gebeurt elke dag.",
    points: ["Jaren extra terugverdientijd", "Garantieproblemen door foute plaatsing", "Keuring en AREI-conformiteit niet in orde"],
  },
  {
    tag: "De oplossing",
    title: "Een ingenieur die eerst rekent, dan pas installeert.",
    body: "Bij VBTEC staat ingenieursbegeleiding op één. Elk project start met een meting en een berekening. Pas als de cijfers kloppen, gaan we aan de slag.",
    points: ["Analyse van je reële verbruiksdata", "Gestaafd rendementsrapport vooraf", "Eén aanspreekpunt van studie tot keuring"],
  },
];

export const process = [
  { n: "01", title: "Verbruiksanalyse", body: "We lezen je digitale meter uit en brengen je verbruik per kwartier in kaart." },
  { n: "02", title: "Technische studie", body: "Een ingenieur berekent opbrengst, schaduw, warmteverlies en de ideale dimensionering." },
  { n: "03", title: "Gestaafd voorstel", body: "Je krijgt een helder rapport met investering, besparing en terugverdientijd — zwart op wit." },
  { n: "04", title: "Installatie & keuring", body: "Eigen installateurs, AREI-keuring inbegrepen, en monitoring zodat je resultaten ziet." },
];

export const faqGroups = [
  {
    question: "Wat is een thuisbatterij eigenlijk?",
    answer:
      "Een thuisbatterij slaat de zonnestroom op die je overdag niet meteen verbruikt. ’s Avonds en ’s nachts gebruik je die energie zelf, in plaats van ze voor bijna niets op het net te zetten en later duur terug te kopen.",
  },
  {
    question: "Waarom heb ik dit nodig?",
    answer:
      "Sinds de terugdraaiende teller verdwenen is, verdien je vooral aan wat je zélf verbruikt. Met het capaciteitstarief betaal je bovendien voor je hoogste piek. Een juist gedimensioneerde installatie verhoogt je eigen verbruik en vlakt je pieken af.",
  },
  {
    question: "Hoe bespaar ik op zo’n grote investering?",
    answer:
      "Door niet te veel te kopen. Onze ingenieur rekent uit wat je écht nodig hebt, combineert systemen slim (bv. zonnepanelen + batterij + laadpaal op één hybride omvormer) en we helpen je met alle beschikbare premies en fiscale voordelen.",
  },
  {
    question: "Is een warmtepomp geschikt voor mijn woning?",
    answer:
      "Dat hangt af van je isolatie en afgiftesysteem. Met een warmteverliesberekening per ruimte weten we exact welk vermogen je nodig hebt — en of een hybride oplossing slimmer is.",
  },
  {
    question: "Wat is het verschil tussen PV en PVT?",
    answer:
      "Klassieke PV-panelen maken enkel stroom. PVT-panelen maken stroom én warmte, die je warmtepomp als bron gebruikt. Zo haal je meer energie uit hetzelfde dakoppervlak.",
  },
  {
    question: "Hoe lang duurt een installatie?",
    answer:
      "Na de studie en je akkoord plannen we meestal binnen 3 à 6 weken. Zonnepanelen zijn doorgaans in één dag geplaatst, een warmtepomp in twee à drie dagen.",
  },
];

// Placeholder team: real portraits to be supplied by VBTEC.
export const team = [
  { name: "Naam Zaakvoerder", role: "Zaakvoerder & ingenieur", initials: "VB" },
  { name: "Naam Ingenieur", role: "Studie-ingenieur energie", initials: "IE" },
  { name: "Naam Projectleider", role: "Projectleider installaties", initials: "PL" },
  { name: "Naam Technieker", role: "Hoofdinstallateur", initials: "HT" },
];

export const reviews = [
  { name: "Katrien D.", place: "Gent", text: "Eindelijk iemand die eerst rekende in plaats van meteen een offerte te sturen. Het rapport was helder en de batterij is exact zo groot als nodig.", service: "Thuisbatterij" },
  { name: "Pieter V.", place: "Brugge", text: "Zeer professioneel. De ingenieur legde alles uit op onze keukentafel, van capaciteitstarief tot terugverdientijd. Installatie netjes in één dag.", service: "Zonnepanelen" },
  { name: "Sofie & Bart", place: "Kortrijk", text: "Onze warmtepomp draait perfect, ook in de winter. Dankzij de warmteverliesberekening geen oversized toestel. Aanrader!", service: "Warmtepomp" },
  { name: "Jonas M.", place: "Leuven", text: "Laadpaal, panelen en batterij op één omvormer. Alles communiceert, en ik zie in de app precies wat ik bespaar.", service: "Laadpaal" },
  { name: "Els V.", place: "Aalst", text: "Correcte afspraken, nette werf en een keuring zonder opmerkingen. Zo hoort het.", service: "Omvormer" },
  { name: "Tom H.", place: "Roeselare", text: "We twijfelden tussen PV en PVT. Het advies was eerlijk en goed onderbouwd, geen verkooppraatjes.", service: "PVT" },
];

export const posts = [
  {
    slug: "loont-een-thuisbatterij-in-2026",
    title: "Loont een thuisbatterij in 2026? De eerlijke berekening",
    excerpt: "Capaciteitstarief, dynamische contracten en de juiste capaciteit: wanneer een batterij wél en niet rendabel is.",
    category: "Thuisbatterij",
    read: "6 min",
    date: "12 september 2026",
    image: "/images/battery.jpg",
    body: [
      "Een thuisbatterij is geen automatische winst. Het rendement hangt af van drie dingen: hoeveel zonnestroom je overdag overhoudt, hoeveel je ’s avonds verbruikt en welk energiecontract je hebt.",
      "In de praktijk zien we dat een batterij van 5 à 10 kWh voor een gemiddeld Vlaams gezin met zonnepanelen het meeste oplevert. Groter is zelden beter: een batterij die nooit volledig vol of leeg raakt, verdient zich niet terug.",
      "Met een dynamisch contract kan een slimme batterij bovendien laden wanneer de stroomprijs laag is en ontladen wanneer ze hoog is. Dat vraagt wel een omvormer en sturing die dit correct ondersteunen.",
      "Onze aanpak: we analyseren je kwartierdata van de digitale meter en simuleren verschillende batterijgroottes. Zo zie je vooraf, zwart op wit, wat elke optie oplevert.",
    ],
  },
  {
    slug: "capaciteitstarief-uitgelegd",
    title: "Het capaciteitstarief uitgelegd in 5 minuten",
    excerpt: "Waarom je piekverbruik je factuur bepaalt en hoe je die piek slim afvlakt met je installatie.",
    category: "Energiefactuur",
    read: "5 min",
    date: "28 augustus 2026",
    image: "/images/consult.jpg",
    body: [
      "Sinds de invoering van het capaciteitstarief betaal je een deel van je nettarieven op basis van je hoogste kwartierpiek van de maand.",
      "Tegelijk koken, de wagen laden en de warmtepomp laten draaien? Dan schiet je piek omhoog — en je factuur mee.",
      "Slimme sturing van je laadpaal, een batterij die piekmomenten opvangt en een correct ingestelde warmtepomp kunnen je piek aanzienlijk verlagen.",
      "Tijdens onze verbruiksanalyse brengen we je pieken in kaart en tonen we welke maatregel het meeste effect heeft.",
    ],
  },
  {
    slug: "pvt-of-klassieke-zonnepanelen",
    title: "PVT of klassieke zonnepanelen: wat past bij jouw woning?",
    excerpt: "Stroom én warmte uit één paneel klinkt ideaal. Maar wanneer is PVT echt de slimste keuze?",
    category: "PVT",
    read: "7 min",
    date: "9 augustus 2026",
    image: "/images/pvt.svg",
    body: [
      "PVT-panelen combineren fotovoltaïsche cellen met een warmtewisselaar. Ze leveren dus elektriciteit én warmte.",
      "Die warmte is vooral interessant als bron voor een water-water warmtepomp. Zo heb je geen buitenunit nodig en haal je meer energie uit hetzelfde dak.",
      "PVT is minder interessant als je geen warmtepomp plant of voldoende dakoppervlak hebt voor klassieke panelen.",
      "Een ingenieur vergelijkt beide scenario’s op basis van je warmtevraag, dakoppervlak en budget.",
    ],
  },
];
