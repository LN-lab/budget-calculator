<template>
  <ion-page >
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title size="large">Mon budget app</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content >
      <ion-grid>
        <ion-row>
          <!--1 ligne 1 colonne qui prend la moitié de 12 dès qu'on dépasse la taille md. on la décale de 3 pour la centrer-->
          <ion-col size-md="6" offset-md="3">
            <ion-card>
              <ion-card-header>Nouvelle dépense</ion-card-header>
              <ion-card-content>
                <ion-item>
                  <ion-label position="stacked"
                    >Déscription de la dépense :
                  </ion-label>
                  <ion-input
                    :value="description"
                    @ionChange="description = $event.target.value"
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="fixed">Montant : </ion-label>
                  <ion-input
                    :value="amount"
                    type=number
                    @ionChange="amount = $event.target.value"
                  ></ion-input>
                </ion-item>
                <div class="ion-float-right ion-margin-top ion-margin-bottom">
                  <ion-button
                    fill="outline"
                    @click="ClearList()"
                    color="danger">
                    <ion-icon name="close-circle-outline"></ion-icon
                    >Clear</ion-button
                  >
                  <ion-button 
                  @click="AddSpending()">
                  <ion-icon name="add-sharp"></ion-icon>
                    AJOUTER DEPENSE</ion-button>
                </div>
              </ion-card-content>
            </ion-card>
            <ion-list v-for="spending in spendings" :key="spending.description">
              <ion-item>
                <ion-label
                  >{{ spending.description }}:
                  {{ spending.amount }} €</ion-label
                >
              </ion-item>
            </ion-list>
            <p>
              Vous avez rentré {{ spendings.length }} dépenses pour un total de
              {{ total }} €.
            </p>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>


<script lang="ts">
//création d'une classe item avec une description et un montant
class Spending {
  description: string;
  amount: number;
  constructor(description: string, amount: string) {
    this.description = description;
    this.amount = parseInt(amount);
  }
}
import {
  IonContent,
  IonCard,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCardContent,
  IonCardHeader,
  IonLabel,
  IonInput,
  IonItem,
  IonIcon,
  IonCol,
  IonRow,
  IonGrid,
  IonList,
  alertController,
 
} from "@ionic/vue";
import { defineComponent } from "vue";
import { addIcons } from "ionicons";
import { addSharp, closeCircleOutline } from "ionicons/icons";

addIcons({
  "close-circle-outline": closeCircleOutline,
  "add-sharp":addSharp
});

export default defineComponent({
  name: "Home",

  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonCard,
    IonButton,
    IonCardContent,
    IonCardHeader,
    IonLabel,
    IonInput,
    IonItem,
    IonIcon,
    IonCol,
    IonRow,
    IonGrid,
    IonList,
      },

  data() {
    return {
      description: "",
      amount: "",
      spendings: Array<Spending>(),
      total: 0,
    };
  },

  methods: {
    CheckButton() {
      console.log("Bouton fonctionnel!");
    },
    AddSpending() {
      this.CheckButton();
      //
      if (!this.amount || !this.description || (parseInt(this.amount)<0)){
        this.presentAlertCheckInputs();
      } else {
        this.spendings.push(new Spending(this.description, this.amount));
        this.SumAmounts();
      }
    },
    ClearList() {
      this.spendings.length = 0;
    },

    SumAmounts() {
      // pour chaque item Spending de mon tableau spendings j'ajoute le montant des items au total
      this.spendings.forEach((item: Spending) => (this.total += item.amount));
    },
    //alert configurée dans une méthode issue de la doc Ion-alert
    async presentAlertCheckInputs() {
      const alert = await alertController.create({
        header: "Alert",
        subHeader: "Valeur non correcte",
        message: "le message ou le nombre est incorrecte",
        buttons: ["OK"],
      });
      return alert.present();
    },
  },
});
</script>

<style >
:root{
  --ion-color-primary: #ffa24f;
  --ion-color-primary-rgb: 255,162,79;
  --ion-color-primary-contrast: #000000;
  --ion-color-pirmary-contrast-rgb: 0,0,0;
  --ion-color-primary-shade: #e08f46;
  --ion-color-primary-tint: #ffab61;
}

.ion-color-orange {
--ion-color-base: var(--ion-color-primary) !important;
--ion-color-base-rgb: var(--ion-color-primary-rgb) !important;
--ion-color-contrast: var(--ion-color-primary-contrast) !important;
--ion-color-contrast-rgb: var(--ion-color-primary-contrast-rgb) !important;
--ion-color-shade: var(--ion-color-primary-shade) !important;
--ion-color-tint: var(--ion-color-primary-tint) !important;
}

#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>