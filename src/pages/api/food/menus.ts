import { NextApiRequest, NextApiResponse } from "next";
import { MenuResponse, Menu } from "../../../lib/api/main/food/Menu";
// import { RestClient } from "typed-rest-client/RestClient";

async function getMenus(): Promise<Menu[]> {
  // const client = new RestClient(
  //   "sodexo",
  //   "https://potato.södermalmsskolan.com"
  // );

  // const res = await client.get<Menu[]>("/");

  // return res.result;

  return JSON.parse(`[
    {
    "date": "2020-08-30T22:00:00Z",
    "dishes": [
    {
    "title": "Fransk potatissallad med linsbiffar, salsa och ramslöksmajo",
    "id": "710e5e67-9048-4a99-9c3b-abd7017b8772"
    },
    {
    "title": "Fransk potatissallad med chorizo och  tomatsalsa",
    "id": "193835e9-b121-4249-8e6b-abd7017b8ad6"
    }
    ]
    },
    {
    "date": "2020-08-31T22:00:00Z",
    "dishes": [
    {
    "title": "Potatisbullar med  lingonsylt och keso",
    "id": "0fa1c2b5-6654-418c-a903-a27a015a997d"
    },
    {
    "title": "Laxpudding med skirat smör, lingon och fänkålsallad",
    "id": "fb278348-ef4c-43bc-a455-abd7017b8b49"
    }
    ]
    },
    {
    "date": "2020-09-01T22:00:00Z",
    "dishes": [
    {
    "title": "Pasta med tomat- och linssås med basilika och Grana Padano",
    "id": "505dc64f-5c76-4299-92ad-beaae18fe196"
    },
    {
    "title": "Köttfärssås och spaghetti ",
    "id": "df4247b4-18e7-46a7-bb53-abd7017b88d4"
    }
    ]
    },
    {
    "date": "2020-09-02T22:00:00Z",
    "dishes": [
    {
    "title": "Quinoa- och grön ärtbiff serveras med couscoussallad samt myntaostcreme",
    "id": "ac554b71-ea33-4be4-aa4f-abd7017b86d6"
    },
    {
    "title": "Ugnsrostad rotfruktspytt med jalapeno pickles och refried beans",
    "id": "34c5b32b-72fb-4a14-bafa-83e0ec18cac4"
    }
    ]
    },
    {
    "date": "2020-09-03T22:00:00Z",
    "dishes": [
    {
    "title": "Tortilla med grönsaker och ost, tomat och chili (Grönsakswok med tortilla)",
    "id": "c41b3f02-d254-4cb1-af23-d31c5031ce4a"
    },
    {
    "title": "Ugnsbakad kycklingfilé med barbequesås, rostad majs och rostad potatis",
    "id": "f5dbe8b9-c32a-4122-b53b-abd7017b8a57"
    }
    ]
    },
    {
    "date": "2020-09-06T22:00:00Z",
    "dishes": [
    {
    "title": "Pasta med broccoli- och ostsås",
    "id": "bac7efd0-37e0-4c3a-823a-a1e3015a1f62"
    },
    {
    "title": "Köttgryta Stifado (grekisk gryta med smaker av kanel och kryddnejlika) servera med kokt potatis ",
    "id": "e8b1bb41-1820-490e-8bd9-aaa4017b4d4f"
    }
    ]
    },
    {
    "date": "2020-09-07T22:00:00Z",
    "dishes": [
    {
    "title": "Kålpudding med gröna linser, kokt potatis och lingonsylt",
    "id": "6b92e26c-d9b5-44fb-9089-abd7017b8908"
    },
    {
    "title": "Pankobakad fiskfilé serveras med chili- och korianderris och sojadressing",
    "id": "b2c07a7f-31ef-4eee-a31c-abd7017b87fb"
    }
    ]
    },
    {
    "date": "2020-09-08T22:00:00Z",
    "dishes": [
    {
    "title": "Spenat- och fetaostlasagne med tomat- och linssallad",
    "id": "93dfaeb9-81ef-48b0-8f33-abd7017b87d9"
    },
    {
    "title": "Pasta Alfredo (krämig sås med kyckling och ost) serveras med tomatsallad",
    "id": "6adea99d-1922-468d-aef9-abd7017b8a1a"
    }
    ]
    },
    {
    "date": "2020-09-09T22:00:00Z",
    "dishes": [
    {
    "title": "Dhal - indisk linsgryta med basmatiris",
    "id": "2e4a0bd5-49e6-4ce9-a919-5b4fc23872a4"
    },
    {
    "title": "Ärtsoppa och pannkaka med sylt",
    "id": "2f97461a-309c-43cc-9303-a1eb015a2ec8"
    }
    ]
    },
    {
    "date": "2020-09-10T22:00:00Z",
    "dishes": [
    {
    "title": "Oumph shawarma med libabröd, tabboulleh och vitlöksdressing",
    "id": "c3f20787-368f-4240-b8cb-b95e98df6625"
    },
    {
    "title": "Kyckling shawarma med libabröd, tabbouleh och vitlöksdressing",
    "id": "bfdb4e7e-a646-4c74-8392-abd7017b89a8"
    }
    ]
    },
    {
    "date": "2020-09-13T22:00:00Z",
    "dishes": [
    {
    "title": "Krämig böngulasch med gräddfil och tortillabröd",
    "id": "353cf9ab-5dee-4dff-8e6f-7e25e06fc619"
    },
    {
    "title": "Pannbiff med gräddsås, kokt potatis och lingonsylt ",
    "id": "88369f24-900a-4786-a216-abd7017b894f"
    }
    ]
    },
    {
    "date": "2020-09-14T22:00:00Z",
    "dishes": [
    {
    "title": "Falafel smaksatt med dill och citron samt grönkål och äppelsallad, bulgur",
    "id": "dc706d86-358e-4588-af5e-fb6817590097"
    },
    {
    "title": "Bouillabaisse med lax och kokt potatis",
    "id": "bea0bc73-7f19-40e9-ad8d-abd7017b86c8"
    }
    ]
    },
    {
    "date": "2020-09-15T22:00:00Z",
    "dishes": [
    {
    "title": "Rödbets- och fetaostbiff med picklad rödlök samt tabbouleh",
    "id": "79ef4f3b-1aeb-4d46-82f0-abd7017b8a0b"
    },
    {
    "title": "Asiatisk kycklingburgare med klyftpotatis och rostade rotfrukter",
    "id": "ac92ebd1-8e21-40c9-8ce5-abd7017b89fd"
    }
    ]
    },
    {
    "date": "2020-09-16T22:00:00Z",
    "dishes": [
    {
    "title": "Melanzane a´la Grana Padano - Grön moussaka",
    "id": "d580a38c-116b-4640-8557-ae483f26b4d8"
    },
    {
    "title": "Pasta med ost- och basilikasås",
    "id": "371058d5-c23d-42a8-a0be-aaa4017b4d5e"
    }
    ]
    },
    {
    "date": "2020-09-17T22:00:00Z",
    "dishes": [
    {
    "title": "Tacobuffé med sojafärs och klassiska tillbehör, salsa, gräddfil, ost, nachos, ris",
    "id": "180168ed-ba31-45e0-aa00-a78c017b614a"
    },
    {
    "title": "Tacobuffé med klassiska tillbehör, salsa, gräddfil, ost, nachos, och ris",
    "id": "0d85ad9b-2956-4aa3-b97d-a221015a6468"
    }
    ]
    },
    {
    "date": "2020-09-20T22:00:00Z",
    "dishes": [
    {
    "title": "Indiska linsnuggets i libabröd med raita och sallad",
    "id": "b7134447-d6fb-4566-8fec-a0b78081ce2a"
    },
    {
    "title": "Kycklingköttbullar med tomatsås och potatismos",
    "id": "d6eed6d4-ec39-411a-8a3e-abd7017b8b57"
    }
    ]
    },
    {
    "date": "2020-09-21T22:00:00Z",
    "dishes": [
    {
    "title": "Pasta med tomat- och linssås ",
    "id": "e541983c-842e-409c-84ed-a832017c6ab2"
    },
    {
    "title": "Pasta med krämig lax- och spenatsås",
    "id": "33390224-8089-4a8d-b6de-abd7017b8ac8"
    }
    ]
    },
    {
    "date": "2020-09-22T22:00:00Z",
    "dishes": [
    {
    "title": "Bao bun med pulled vego och grönsaker",
    "id": "6d80da42-d91b-4785-8376-7cccd485f5b1"
    },
    {
    "title": "Pulled chicken med barbequesås, ris, tortilla, rostad majs, gräddfil",
    "id": "566752b0-12bd-4594-873b-abd7017b88c1"
    }
    ]
    },
    {
    "date": "2020-09-23T22:00:00Z",
    "dishes": [
    {
    "title": "Potatis- och purjolöksoppa med hembakat bröd, färskost med örter",
    "id": "967eed63-3baa-48bd-89b2-abd7017b88b3"
    },
    {
    "title": "Frittata med spenat, Grana Padano och rostade solroskärnor",
    "id": "a24fb1a3-7df5-4b65-b6ef-1bd594852415"
    }
    ]
    },
    {
    "date": "2020-09-24T22:00:00Z",
    "dishes": [
    {
    "title": "Palsternacksbiff med kokt potatis, gräddsås och äppelmos",
    "id": "fb098d50-6235-4505-a004-aaa4017b5095"
    },
    {
    "title": "Bakad fläskkarré med gräddsås, äppelmos och kokt potatis",
    "id": "09f8e63b-5d6b-4e82-bd98-abd7017b8bfc"
    }
    ]
    },
    {
    "date": "2020-09-27T22:00:00Z",
    "dishes": [
    {
    "title": "Tandoori med kokosgrädde, broccoli, pulled Oumph och koriander serveras med ris",
    "id": "f1480166-a10a-4530-a897-fb4eca52ec6a"
    },
    {
    "title": "Kyckling i röd curry med kokos och basmatiris",
    "id": "5dccd85e-b2df-4f3a-b7a1-abd7017b8b0f"
    }
    ]
    },
    {
    "date": "2020-09-28T22:00:00Z",
    "dishes": [
    {
    "title": "Kikärtsbiffar serveras med basilikacreme samt couscous",
    "id": "1b6fb38f-b02a-4257-800e-abd7017b8929"
    },
    {
    "title": "Fiskgratäng med hummersås och räkor, potatismos",
    "id": "7a89e4e2-ddf6-4add-bb54-abd7017b8bba"
    }
    ]
    },
    {
    "date": "2020-09-29T22:00:00Z",
    "dishes": [
    {
    "title": "Grönlimpa med vegofärs, gräddsås, rårörda lingon, kokt potatis och pressgurka",
    "id": "e210c81f-0273-4086-a860-6cfcd475a5c9"
    },
    {
    "title": "Köttfärssås och spaghetti (med röda linser)",
    "id": "c2494638-82af-4a61-a253-abd7017b8809"
    }
    ]
    },
    {
    "date": "2020-09-30T22:00:00Z",
    "dishes": [
    {
    "title": "Tomatsoppa med pasta och pannkaka med sylt",
    "id": "e1546e42-2977-48b2-a5d4-a55600afd903"
    },
    {
    "title": "Dhal - indisk linsgryta med basmatiris",
    "id": "2e4a0bd5-49e6-4ce9-a919-5b4fc23872a4"
    }
    ]
    },
    {
    "date": "2020-10-01T22:00:00Z",
    "dishes": [
    {
    "title": "Bao bun med pulled vego och grönsaker",
    "id": "6d80da42-d91b-4785-8376-7cccd485f5b1"
    },
    {
    "title": "Grekiska färsbiffar med tzatziki och grönsaksbulgur",
    "id": "0ac3fba5-49c7-43fe-b81e-abd7017b873e"
    }
    ]
    },
    {
    "date": "2020-10-04T22:00:00Z",
    "dishes": [
    {
    "title": "Oumph shawarma med libabröd, tabboulleh och vitlöksdressing",
    "id": "c3f20787-368f-4240-b8cb-b95e98df6625"
    },
    {
    "title": "Biff Stroganoff med ris",
    "id": "540513a8-3734-4df2-9023-ab28017b1d1e"
    }
    ]
    },
    {
    "date": "2020-10-05T22:00:00Z",
    "dishes": [
    {
    "title": "Potatisbullar med  lingonsylt och keso",
    "id": "0fa1c2b5-6654-418c-a903-a27a015a997d"
    },
    {
    "title": "Stekt strömming(sillflundra) serveras med potatismos, skirat smör och rårörda lingon",
    "id": "210ecda3-c5cb-439d-aa44-aaa4017b4ce3"
    }
    ]
    },
    {
    "date": "2020-10-06T22:00:00Z",
    "dishes": [
    {
    "title": "Tacos med rostad blomkål och rökig bönsalsa",
    "id": "7084bcc7-78c7-45b0-b3bf-4e10f79905d9"
    },
    {
    "title": "Texas Chili med gräddfil, picklad rödlök och bulgur",
    "id": "20301f3e-e805-496d-9120-abd7017b8a9e"
    }
    ]
    },
    {
    "date": "2020-10-07T22:00:00Z",
    "dishes": [
    {
    "title": "Grönburgare i grovbröd, rostade rotfrukter, pesto och tomatsymfoni",
    "id": "d3f8e2db-3976-481d-b7c4-1629d6687c80"
    },
    {
    "title": "Frittata med spenat, Grana Padano och rostade solroskärnor",
    "id": "a24fb1a3-7df5-4b65-b6ef-1bd594852415"
    }
    ]
    },
    {
    "date": "2020-10-08T22:00:00Z",
    "dishes": [
    {
    "title": "Vegokorv med potatismos, gurkmajo, senap och ketchup",
    "id": "c5a1340d-431e-4e82-a650-b82c82745fed"
    },
    {
    "title": "Kokt wienerkorv med potatismos, gurkmajo, senap och ketchup",
    "id": "1df4982b-d747-4b98-9064-a22d015a2653"
    }
    ]
    },
    {
    "date": "2020-10-11T22:00:00Z",
    "dishes": [
    {
    "title": "Chili sin carne med gräddfil, picklad rödlök och bulgur",
    "id": "ed2c52b6-7a06-4b27-878b-abd7017b888d"
    },
    {
    "title": "Kyckling i curry med basmatiris",
    "id": "1e80150e-ddd7-446e-83d5-abd7017b896b"
    }
    ]
    },
    {
    "date": "2020-10-12T22:00:00Z",
    "dishes": [
    {
    "title": "Grön wallenbergare med ärtor och rårörda lingon",
    "id": "2eda929e-bb59-47a4-95c4-ee3d6d5333f0"
    },
    {
    "title": "Fiskburgare med kokt potatis, picklad rödlök och dillmajo ",
    "id": "a2a0fd3e-ad4c-4933-ad8c-abd7017b8aed"
    }
    ]
    },
    {
    "date": "2020-10-13T22:00:00Z",
    "dishes": [
    {
    "title": "Blomkålscurry med ris och asiatisk sallad",
    "id": "4df03571-de31-4fab-bd80-6b7eea9437df"
    },
    {
    "title": "Chili con carne med gräddfil, picklad lök och bulgur",
    "id": "ea9a1a9d-d96f-4731-927a-abd7017b8730"
    }
    ]
    },
    {
    "date": "2020-10-14T22:00:00Z",
    "dishes": [
    {
    "title": "Gratinerad pastagratäng med tomat och mozzarella",
    "id": "e91e0513-6b05-48d8-a27f-a14d015a1c3c"
    },
    {
    "title": "Zucchinifritters (zucchiniplättar) med keso och örter - couscous",
    "id": "b2a4693e-e1d5-4b6a-b495-2c1e6a2ccec9"
    }
    ]
    },
    {
    "date": "2020-10-15T22:00:00Z",
    "dishes": [
    {
    "title": "Grön tomat- och mifúsås med pasta ",
    "id": "74f60b25-3915-4901-a8c7-abd7017b8adf"
    },
    {
    "title": "Tomat- och kycklingsås med pasta",
    "id": "aa3e09b7-1cc5-401f-97b9-abd7017b88e2"
    }
    ]
    },
    {
    "date": "2020-10-18T22:00:00Z",
    "dishes": [
    {
    "title": "Oklassisk Mifú Stroganoff med grönsaker, grönkål och ris",
    "id": "fd9cffc1-ead6-4569-82d4-4d97bd016a9f"
    },
    {
    "title": "Korv Stroganoff med ris",
    "id": "0bcd90ed-b59c-4fcc-900e-a19a015a32f9"
    }
    ]
    },
    {
    "date": "2020-10-19T22:00:00Z",
    "dishes": [
    {
    "title": "Frittata med spenat, Grana Padano och rostade solroskärnor",
    "id": "a24fb1a3-7df5-4b65-b6ef-1bd594852415"
    },
    {
    "title": "Ugnsbakad fiskfilé med kokt potatis och vitvinssås",
    "id": "8941fd1d-5d90-4503-9d7d-abd7017b8a8f"
    }
    ]
    },
    {
    "date": "2020-10-20T22:00:00Z",
    "dishes": [
    {
    "title": "Pasta med tomat- och linssås ",
    "id": "e541983c-842e-409c-84ed-a832017c6ab2"
    },
    {
    "title": "Pasta Carbonara med bacon",
    "id": "a7d476de-6620-4d46-9808-a1e3015a1df4"
    }
    ]
    },
    {
    "date": "2020-10-21T22:00:00Z",
    "dishes": [
    {
    "title": "Dhal - indisk linsgryta med basmatiris",
    "id": "2e4a0bd5-49e6-4ce9-a919-5b4fc23872a4"
    },
    {
    "title": "Broccolisoppa med rostade linser, mjukt bröd och ost ",
    "id": "aa18ade5-fddc-4428-b28d-abd7017b8b73"
    }
    ]
    },
    {
    "date": "2020-10-22T22:00:00Z",
    "dishes": [
    {
    "title": "Grön burgare med smak av rotfrukter och chilikräm samt rostade morötter",
    "id": "ed681ac5-fa1f-43ed-8e9e-cb8bbd251202"
    },
    {
    "title": "Kyckling Tandoori med bulgur och Tandooriyoghurt ",
    "id": "eae59750-b480-4517-a4bb-abd7017b8bc8"
    }
    ]
    },
    {
    "date": "2020-11-01T23:00:00Z",
    "dishes": [
    {
    "title": "Fullkornsbulgur med linsbiffar, salsa och ramslöksmajo",
    "id": "ff4aa159-9148-4310-bf56-ac0d017b163e"
    },
    {
    "title": "Fullkornsbulgur med chorizo och salsa",
    "id": "6937515b-2476-4f4e-b6eb-ac0d017b165f"
    }
    ]
    },
    {
    "date": "2020-11-02T23:00:00Z",
    "dishes": [
    {
    "title": "Potatisbullar med  lingonsylt och keso",
    "id": "0fa1c2b5-6654-418c-a903-a27a015a997d"
    },
    {
    "title": "Laxpudding med skirat smör, lingon och fänkålsallad",
    "id": "fb278348-ef4c-43bc-a455-abd7017b8b49"
    }
    ]
    },
    {
    "date": "2020-11-03T23:00:00Z",
    "dishes": [
    {
    "title": "Pasta med tomat- och linssås med basilika och Grana Padano",
    "id": "505dc64f-5c76-4299-92ad-beaae18fe196"
    },
    {
    "title": "Köttfärssås och spaghetti ",
    "id": "df4247b4-18e7-46a7-bb53-abd7017b88d4"
    }
    ]
    },
    {
    "date": "2020-11-04T23:00:00Z",
    "dishes": [
    {
    "title": "Blomkålscurry med ris och asiatisk sallad",
    "id": "4df03571-de31-4fab-bd80-6b7eea9437df"
    },
    {
    "title": "Slät pumpasoppa med ingefära och chili serveras med mjukt bröd och färskost",
    "id": "552f826f-3f84-4c5c-b0be-ac0d017b1807"
    }
    ]
    },
    {
    "date": "2020-11-05T23:00:00Z",
    "dishes": [
    {
    "title": "Tortilla med grönsaker och ost, tomat och chili (Grönsakswok med tortilla)",
    "id": "c41b3f02-d254-4cb1-af23-d31c5031ce4a"
    },
    {
    "title": "Ugnsbakad kycklingfilé med barbequesås, rostad majs och rostad potatis",
    "id": "f5dbe8b9-c32a-4122-b53b-abd7017b8a57"
    }
    ]
    },
    {
    "date": "2020-11-08T23:00:00Z",
    "dishes": [
    {
    "title": "Spenat- och fetaostlasagne med tomat- och linssallad",
    "id": "93dfaeb9-81ef-48b0-8f33-abd7017b87d9"
    },
    {
    "title": "Köttgryta Stifado (grekisk gryta med smaker av kanel och kryddnejlika) servera med kokt potatis ",
    "id": "e8b1bb41-1820-490e-8bd9-aaa4017b4d4f"
    }
    ]
    },
    {
    "date": "2020-11-09T23:00:00Z",
    "dishes": [
    {
    "title": "Kålpudding med gröna linser, kokt potatis och lingonsylt",
    "id": "6b92e26c-d9b5-44fb-9089-abd7017b8908"
    },
    {
    "title": "Pankobakad fiskfilé serveras med chili- och korianderris och sojadressing",
    "id": "b2c07a7f-31ef-4eee-a31c-abd7017b87fb"
    }
    ]
    },
    {
    "date": "2020-11-10T23:00:00Z",
    "dishes": [
    {
    "title": "Pasta med broccoli- och ostsås",
    "id": "bac7efd0-37e0-4c3a-823a-a1e3015a1f62"
    },
    {
    "title": "Pasta Alfredo (krämig sås med kyckling och ost) serveras med tomatsallad",
    "id": "6adea99d-1922-468d-aef9-abd7017b8a1a"
    }
    ]
    },
    {
    "date": "2020-11-11T23:00:00Z",
    "dishes": [
    {
    "title": "Chili sin carne med gräddfil, picklad rödlök och bulgur",
    "id": "ed2c52b6-7a06-4b27-878b-abd7017b888d"
    },
    {
    "title": "Ärtsoppa och pannkaka med sylt",
    "id": "2f97461a-309c-43cc-9303-a1eb015a2ec8"
    }
    ]
    },
    {
    "date": "2020-11-12T23:00:00Z",
    "dishes": [
    {
    "title": "Oumph shawarma med libabröd, tabboulleh och vitlöksdressing",
    "id": "c3f20787-368f-4240-b8cb-b95e98df6625"
    },
    {
    "title": "Kyckling shawarma med libabröd, tabbouleh och vitlöksdressing",
    "id": "bfdb4e7e-a646-4c74-8392-abd7017b89a8"
    }
    ]
    },
    {
    "date": "2020-11-15T23:00:00Z",
    "dishes": [
    {
    "title": "Krämig böngulasch med gräddfil och tortillabröd",
    "id": "353cf9ab-5dee-4dff-8e6f-7e25e06fc619"
    },
    {
    "title": "Pannbiff med gräddsås, kokt potatis och lingonsylt ",
    "id": "88369f24-900a-4786-a216-abd7017b894f"
    }
    ]
    },
    {
    "date": "2020-11-16T23:00:00Z",
    "dishes": [
    {
    "title": "Falafel smaksatt med dill och citron samt grönkål och äppelsallad, bulgur",
    "id": "dc706d86-358e-4588-af5e-fb6817590097"
    },
    {
    "title": "Bouillabaisse med lax och kokt potatis",
    "id": "bea0bc73-7f19-40e9-ad8d-abd7017b86c8"
    }
    ]
    },
    {
    "date": "2020-11-17T23:00:00Z",
    "dishes": [
    {
    "title": "Rödbets- och fetaostbiff med picklad rödlök samt tabbouleh",
    "id": "79ef4f3b-1aeb-4d46-82f0-abd7017b8a0b"
    },
    {
    "title": "Asiatisk kycklingburgare med klyftpotatis och rostade rotfrukter",
    "id": "ac92ebd1-8e21-40c9-8ce5-abd7017b89fd"
    }
    ]
    },
    {
    "date": "2020-11-18T23:00:00Z",
    "dishes": [
    {
    "title": "Italiensk pastagratäng med tomat och mozzarella",
    "id": "d61636fb-3044-4351-9d86-ac0d017b122c"
    },
    {
    "title": "Broccolisoppa med rostade linser, mjukt bröd och ost ",
    "id": "aa18ade5-fddc-4428-b28d-abd7017b8b73"
    }
    ]
    },
    {
    "date": "2020-11-19T23:00:00Z",
    "dishes": [
    {
    "title": "Tacobuffé med sojafärs och klassiska tillbehör, salsa, gräddfil, ost, nachos, ris",
    "id": "180168ed-ba31-45e0-aa00-a78c017b614a"
    },
    {
    "title": "Tacobuffé med klassiska tillbehör, salsa, gräddfil, ost, nachos, och ris",
    "id": "0d85ad9b-2956-4aa3-b97d-a221015a6468"
    }
    ]
    },
    {
    "date": "2020-11-22T23:00:00Z",
    "dishes": [
    {
    "title": "Indiska linsnuggets i libabröd med raita och sallad",
    "id": "b7134447-d6fb-4566-8fec-a0b78081ce2a"
    },
    {
    "title": "Kycklingköttbullar med tomatsås och potatismos",
    "id": "d6eed6d4-ec39-411a-8a3e-abd7017b8b57"
    }
    ]
    },
    {
    "date": "2020-11-23T23:00:00Z",
    "dishes": [
    {
    "title": "Pasta med tomat- och linssås ",
    "id": "e541983c-842e-409c-84ed-a832017c6ab2"
    },
    {
    "title": "Pasta med krämig lax- och spenatsås",
    "id": "33390224-8089-4a8d-b6de-abd7017b8ac8"
    }
    ]
    },
    {
    "date": "2020-11-24T23:00:00Z",
    "dishes": [
    {
    "title": "Bao bun med pulled vego och grönsaker",
    "id": "6d80da42-d91b-4785-8376-7cccd485f5b1"
    },
    {
    "title": "Pulled chicken med barbequesås, ris, tortilla, rostad majs, gräddfil",
    "id": "566752b0-12bd-4594-873b-abd7017b88c1"
    }
    ]
    },
    {
    "date": "2020-11-25T23:00:00Z",
    "dishes": [
    {
    "title": "Broccolifritters med rostad potatis, picklad rödlök och vegansk chilimajonnäs",
    "id": "a9e0b1f7-824e-420b-bd59-44d0f38a1cee"
    },
    {
    "title": "Palak panir - färskost med spenat på indiskt vis med ris",
    "id": "b0bed3fb-6ab7-4b21-b6cc-a3d800b857c5"
    }
    ]
    },
    {
    "date": "2020-11-26T23:00:00Z",
    "dishes": [
    {
    "title": "Palsternacksbiff med kokt potatis, gräddsås och äppelmos",
    "id": "fb098d50-6235-4505-a004-aaa4017b5095"
    },
    {
    "title": "Bakad fläskkarré med gräddsås, äppelmos och kokt potatis",
    "id": "09f8e63b-5d6b-4e82-bd98-abd7017b8bfc"
    }
    ]
    },
    {
    "date": "2020-11-29T23:00:00Z",
    "dishes": [
    {
    "title": "Tandoori med kokosgrädde, broccoli, pulled Oumph och koriander serveras med ris",
    "id": "f1480166-a10a-4530-a897-fb4eca52ec6a"
    },
    {
    "title": "Kyckling i röd curry med kokos och basmatiris",
    "id": "5dccd85e-b2df-4f3a-b7a1-abd7017b8b0f"
    }
    ]
    },
    {
    "date": "2020-11-30T23:00:00Z",
    "dishes": [
    {
    "title": "Kikärtsbiffar serveras med basilikacreme samt couscous",
    "id": "1b6fb38f-b02a-4257-800e-abd7017b8929"
    },
    {
    "title": "Fiskgratäng med hummersås och räkor, potatismos",
    "id": "7a89e4e2-ddf6-4add-bb54-abd7017b8bba"
    }
    ]
    },
    {
    "date": "2020-12-01T23:00:00Z",
    "dishes": [
    {
    "title": "Grönlimpa med vegofärs, gräddsås, rårörda lingon, kokt potatis och pressgurka",
    "id": "e210c81f-0273-4086-a860-6cfcd475a5c9"
    },
    {
    "title": "Köttfärssås och spaghetti (med röda linser)",
    "id": "c2494638-82af-4a61-a253-abd7017b8809"
    }
    ]
    },
    {
    "date": "2020-12-02T23:00:00Z",
    "dishes": [
    {
    "title": "Tomatsoppa med pasta och pannkaka med sylt",
    "id": "e1546e42-2977-48b2-a5d4-a55600afd903"
    },
    {
    "title": "Spenat- och riccotafylld canneloni ",
    "id": "0e2cfce9-cabe-427f-864d-ab28017b1eb2"
    }
    ]
    },
    {
    "date": "2020-12-03T23:00:00Z",
    "dishes": [
    {
    "title": "Bao bun med pulled vego och grönsaker",
    "id": "6d80da42-d91b-4785-8376-7cccd485f5b1"
    },
    {
    "title": "Grekiska färsbiffar med tzatziki och grönsaksbulgur",
    "id": "0ac3fba5-49c7-43fe-b81e-abd7017b873e"
    }
    ]
    },
    {
    "date": "2020-12-06T23:00:00Z",
    "dishes": [
    {
    "title": "Oumph shawarma med libabröd, tabboulleh och vitlöksdressing",
    "id": "c3f20787-368f-4240-b8cb-b95e98df6625"
    },
    {
    "title": "Biff Stroganoff med ris",
    "id": "540513a8-3734-4df2-9023-ab28017b1d1e"
    }
    ]
    },
    {
    "date": "2020-12-07T23:00:00Z",
    "dishes": [
    {
    "title": "Potatisbullar med  lingonsylt och keso",
    "id": "0fa1c2b5-6654-418c-a903-a27a015a997d"
    },
    {
    "title": "Stekt strömming(sillflundra) serveras med potatismos, skirat smör och rårörda lingon",
    "id": "210ecda3-c5cb-439d-aa44-aaa4017b4ce3"
    }
    ]
    },
    {
    "date": "2020-12-08T23:00:00Z",
    "dishes": [
    {
    "title": "Tacos med rostad blomkål och rökig bönsalsa",
    "id": "7084bcc7-78c7-45b0-b3bf-4e10f79905d9"
    },
    {
    "title": "Texas Chili med gräddfil, picklad rödlök och bulgur",
    "id": "20301f3e-e805-496d-9120-abd7017b8a9e"
    }
    ]
    },
    {
    "date": "2020-12-09T23:00:00Z",
    "dishes": [
    {
    "title": "Grönburgare i grovbröd, rostade rotfrukter, pesto och tomatsymfoni",
    "id": "d3f8e2db-3976-481d-b7c4-1629d6687c80"
    },
    {
    "title": "Pasta med broccoli- och ostsås",
    "id": "bac7efd0-37e0-4c3a-823a-a1e3015a1f62"
    }
    ]
    },
    {
    "date": "2020-12-10T23:00:00Z",
    "dishes": [
    {
    "title": "Vegokorv med potatismos, gurkmajo, senap och ketchup",
    "id": "c5a1340d-431e-4e82-a650-b82c82745fed"
    },
    {
    "title": "Kokt wienerkorv med potatismos, gurkmajo, senap och ketchup",
    "id": "1df4982b-d747-4b98-9064-a22d015a2653"
    }
    ]
    },
    {
    "date": "2020-12-13T23:00:00Z",
    "dishes": [
    {
    "title": "Nudelsoppa med champinjon, miso, chili och limeblad",
    "id": "00c36c96-a1cd-4ffe-8c90-d4c24e58a118"
    },
    {
    "title": "Traditionell risgrynagröt med kanel, mjukt bröd, skinka och senap",
    "id": "ee9b2525-2909-45c0-96a7-a22d015a3a8a"
    }
    ]
    },
    {
    "date": "2020-12-14T23:00:00Z",
    "dishes": [
    {
    "title": "Falafel smaksatt med dill och citron samt grönkål och äppelsallad, bulgur",
    "id": "dc706d86-358e-4588-af5e-fb6817590097"
    },
    {
    "title": "Fiskburgare med kokt potatis, picklad rödlök och dillmajo ",
    "id": "a2a0fd3e-ad4c-4933-ad8c-abd7017b8aed"
    }
    ]
    },
    {
    "date": "2020-12-15T23:00:00Z",
    "dishes": [
    {
    "title": "Blomkålscurry med ris och asiatisk sallad",
    "id": "4df03571-de31-4fab-bd80-6b7eea9437df"
    },
    {
    "title": "Kyckling i curry med basmatiris",
    "id": "1e80150e-ddd7-446e-83d5-abd7017b896b"
    }
    ]
    },
    {
    "date": "2020-12-16T23:00:00Z",
    "dishes": [
    {
    "title": "Chili sin carne med gräddfil, picklad rödlök och bulgur",
    "id": "ed2c52b6-7a06-4b27-878b-abd7017b888d"
    },
    {
    "title": "Chili con carne med gräddfil, picklad lök och bulgur",
    "id": "ea9a1a9d-d96f-4731-927a-abd7017b8730"
    }
    ]
    },
    {
    "date": "2020-12-17T23:00:00Z",
    "dishes": [
    {
    "title": "Gratinerad pastagratäng med tomat och mozzarella",
    "id": "e91e0513-6b05-48d8-a27f-a14d015a1c3c"
    },
    {
    "title": "Zucchinifritters (zucchiniplättar) smaksatt med keso och örter - couscous",
    "id": "b2a4693e-e1d5-4b6a-b495-2c1e6a2ccec9"
    }
    ]
    }
    ]`);
}

export default async (
  _: NextApiRequest,
  res: NextApiResponse<MenuResponse>
) => {
  const menus = await getMenus();

  res.setHeader("Cache-Control", "s-maxage=86400");
  return res.json({
    data: menus,
    meta: {
      total: menus.length,
    },
  });
};
