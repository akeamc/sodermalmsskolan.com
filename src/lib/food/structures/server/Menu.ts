import { ServerDish } from "./Dish";
import { IMenu, Menu } from "../shared/Menu";

export default class ServerMenu extends Menu {
  dishes: ServerDish[];

  constructor({ dishes, date }: IMenu) {
    super({ dishes, date });

    this.dishes = dishes.map((dish) => new ServerDish(dish));
  }

  public static async fetchAll(): Promise<ServerMenu[]> {
    const data = [{
      date: "2021-05-23T22:00:00Z",
      dishes: [{
        title: "Chili sin carne med ris ", id: "a2cabcf5-9341-4779-b0bd-a8a3015a492c", co2e_url: "https://sodexo.mashie.com/public/internal/meals/a2cabcf5-9341-4779-b0bd-a8a3015a492c/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Chili con carne med ris", id: "117e15cc-c498-4414-84f6-a1eb015a3235", co2e_url: "https://sodexo.mashie.com/public/internal/meals/117e15cc-c498-4414-84f6-a1eb015a3235/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-05-24T22:00:00Z",
      dishes: [{
        title: "Spenat- och riccotafylld canneloni med fyllig tomatsås", id: "0e2cfce9-cabe-427f-864d-ab28017b1eb2", co2e_url: "https://sodexo.mashie.com/public/internal/meals/0e2cfce9-cabe-427f-864d-ab28017b1eb2/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Bouillabaisse (fiskgryta) med lax och kokt potatis", id: "bea0bc73-7f19-40e9-ad8d-abd7017b86c8", co2e_url: "https://sodexo.mashie.com/public/internal/meals/bea0bc73-7f19-40e9-ad8d-abd7017b86c8/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-05-25T22:00:00Z",
      dishes: [{
        title: "Sojafärsbullar i enbärsdoftande gräddsås, kokt potatis samt pressgurka och rårörda lingon\t", id: "e7905b4a-d27d-4b32-a191-aaa4017b4bd8", co2e_url: "https://sodexo.mashie.com/public/internal/meals/e7905b4a-d27d-4b32-a191-aaa4017b4bd8/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Köttbullar med gräddsås, kokt potatis, rårörda lingon och pressgurka\t", id: "e870871b-a1d5-4126-b4cd-aaa4017b4ffe", co2e_url: "https://sodexo.mashie.com/public/internal/meals/e870871b-a1d5-4126-b4cd-aaa4017b4ffe/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-05-26T22:00:00Z",
      dishes: [{
        title: "Gröna fritters med citron, rödbetshummus och råris", id: "174b3785-e446-4661-bc1f-aa3948e23326", co2e_url: "https://sodexo.mashie.com/public/internal/meals/174b3785-e446-4661-bc1f-aa3948e23326/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Potatis- och purjolökssoppa, mjukt bröd och färskost ", id: "49c7cc95-9954-4f15-92a5-a3d800b88a14", co2e_url: "https://sodexo.mashie.com/public/internal/meals/49c7cc95-9954-4f15-92a5-a3d800b88a14/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-05-27T22:00:00Z",
      dishes: [{
        title: "Broccolifritters med rostad potatis, picklad rödlök och vegansk chilimajonnäs", id: "a9e0b1f7-824e-420b-bd59-44d0f38a1cee", co2e_url: "https://sodexo.mashie.com/public/internal/meals/a9e0b1f7-824e-420b-bd59-44d0f38a1cee/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Kycklinglårfilé med barbequesås och rostad potatis", id: "93f9ce43-5057-474e-be62-ac85017b2c9f", co2e_url: "https://sodexo.mashie.com/public/internal/meals/93f9ce43-5057-474e-be62-ac85017b2c9f/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-05-30T22:00:00Z",
      dishes: [{
        title: "Oklassisk Mifú Stroganoff med grönsaker, grönkål och ris", id: "fd9cffc1-ead6-4569-82d4-4d97bd016a9f", co2e_url: "https://sodexo.mashie.com/public/internal/meals/fd9cffc1-ead6-4569-82d4-4d97bd016a9f/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Korv Stroganoff med ris", id: "0bcd90ed-b59c-4fcc-900e-a19a015a32f9", co2e_url: "https://sodexo.mashie.com/public/internal/meals/0bcd90ed-b59c-4fcc-900e-a19a015a32f9/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-05-31T22:00:00Z",
      dishes: [{
        title: "Bakad rotselleri, klyftade rödbetor med fetaost serveras med bulgur, lime- och vitlöksyoghurt", id: "5de5d3f1-6546-42f3-ab6b-ab28017b2199", co2e_url: "https://sodexo.mashie.com/public/internal/meals/5de5d3f1-6546-42f3-ab6b-ab28017b2199/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Fiskcurry (kokos, citrongräs, ingefära, vitlök, chili, koriander) serveras med potatismos", id: "7f54cbca-e13e-4193-aecc-ac85017b3147", co2e_url: "https://sodexo.mashie.com/public/internal/meals/7f54cbca-e13e-4193-aecc-ac85017b3147/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-06-01T22:00:00Z",
      dishes: [{
        title: "Spenat och kesolasagne", id: "ccdaa0c0-5db2-4596-9607-e63401785aec", co2e_url: "https://sodexo.mashie.com/public/internal/meals/ccdaa0c0-5db2-4596-9607-e63401785aec/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Lasagne al forno", id: "5554c098-c060-4555-a2e7-aaa4017b4f46", co2e_url: "https://sodexo.mashie.com/public/internal/meals/5554c098-c060-4555-a2e7-aaa4017b4f46/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-06-02T22:00:00Z",
      dishes: [{
        title: "Gulärtsfalafel med quinoatabbouleh och rödbetshummus", id: "052373ef-2542-49b2-9c35-d9d8dbe5a964", co2e_url: "https://sodexo.mashie.com/public/internal/meals/052373ef-2542-49b2-9c35-d9d8dbe5a964/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Pasta med ost- och basilikasås", id: "371058d5-c23d-42a8-a0be-aaa4017b4d5e", co2e_url: "https://sodexo.mashie.com/public/internal/meals/371058d5-c23d-42a8-a0be-aaa4017b4d5e/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-06-03T22:00:00Z",
      dishes: [{
        title: "Tacos med krispig blomkålsblast rökig bönsalsa och quinoa", id: "7084bcc7-78c7-45b0-b3bf-4e10f79905d9", co2e_url: "https://sodexo.mashie.com/public/internal/meals/7084bcc7-78c7-45b0-b3bf-4e10f79905d9/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Tacobuffé med klassiska tillbehör", id: "56fc1644-06e8-4294-8c63-aaa4017b4b83", co2e_url: "https://sodexo.mashie.com/public/internal/meals/56fc1644-06e8-4294-8c63-aaa4017b4b83/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-06-06T22:00:00Z",
      dishes: [{
        title: "Indisk palak paneer med tofu, raita och vildris", id: "c22d62ae-5ef9-4277-9744-9c15b0f03cff", co2e_url: "https://sodexo.mashie.com/public/internal/meals/c22d62ae-5ef9-4277-9744-9c15b0f03cff/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Kyckling i curry med jasminris ", id: "3d9d43ef-2ade-467c-b9dc-aaa4017b4da1", co2e_url: "https://sodexo.mashie.com/public/internal/meals/3d9d43ef-2ade-467c-b9dc-aaa4017b4da1/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-06-07T22:00:00Z",
      dishes: [{
        title: "Krämig böngulasch med gräddfil och tortillabröd", id: "353cf9ab-5dee-4dff-8e6f-7e25e06fc619", co2e_url: "https://sodexo.mashie.com/public/internal/meals/353cf9ab-5dee-4dff-8e6f-7e25e06fc619/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Stekt sillflundra serveras med potatismos, skirat smör och rårörda lingon", id: "210ecda3-c5cb-439d-aa44-aaa4017b4ce3", co2e_url: "https://sodexo.mashie.com/public/internal/meals/210ecda3-c5cb-439d-aa44-aaa4017b4ce3/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-06-08T22:00:00Z",
      dishes: [{
        title: "Grönburgare i grovbröd, rostade rotfrukter, pesto och tomatsymfoni", id: "d3f8e2db-3976-481d-b7c4-1629d6687c80", co2e_url: "https://sodexo.mashie.com/public/internal/meals/d3f8e2db-3976-481d-b7c4-1629d6687c80/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Pannbiff med gräddsås, kokt potatis och lingonsylt ", id: "88369f24-900a-4786-a216-abd7017b894f", co2e_url: "https://sodexo.mashie.com/public/internal/meals/88369f24-900a-4786-a216-abd7017b894f/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-06-09T22:00:00Z",
      dishes: [{
        title: "Tomat- och linsbowl med basilika och Grana Padano", id: "2d0929ca-c90a-4193-a89d-001edf519298", co2e_url: "https://sodexo.mashie.com/public/internal/meals/2d0929ca-c90a-4193-a89d-001edf519298/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Spaghetti med broccoli- och ostsås toppad med rostade linser", id: "ffbc4386-6644-4270-a1d6-ac85017b30b0", co2e_url: "https://sodexo.mashie.com/public/internal/meals/ffbc4386-6644-4270-a1d6-ac85017b30b0/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }, {
      date: "2021-06-10T22:00:00Z",
      dishes: [{
        title: "Broccoli- och ostpaj med sallad och Rhode Islanddressing", id: "fcec71b4-1bac-4f73-a4bb-ab28017b1e43", co2e_url: "https://sodexo.mashie.com/public/internal/meals/fcec71b4-1bac-4f73-a4bb-ab28017b1e43/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }, {
        title: "Kyckling i röd curry med kokos och ris", id: "5dccd85e-b2df-4f3a-b7a1-abd7017b8b0f", co2e_url: "https://sodexo.mashie.com/public/internal/meals/5dccd85e-b2df-4f3a-b7a1-abd7017b8b0f/rating?orgId=c1337c83-0f30-4863-969e-0dafe8394a0b", co2e: null,
      }],
    }];
    
    const menus = data.map(({ date, dishes }) => new ServerMenu({
      date,
      dishes: dishes.map((dish) => ({
        title: dish.title,
        id: dish.id,
      })),
    }));

    return menus;
  }
}
