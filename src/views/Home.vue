<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar color="primary">
        <ion-title size="large">Mon budget app</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar color="primary">
          <ion-title>Mon budget app</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-grid>
        <ion-row>
          <!--1 ligne 1 colonne qui prend la moitié de 12 dès qu'on dépasse la taille md. on la décale de 3 pour la centrer-->
          <ion-col size-md="6" offset-md="3">
            <ion-card>
              <ion-card-header>Nouvelle dépense</ion-card-header>
              <ion-card-content>
                <ion-item>
                  <ion-label color="primary" position="stacked"
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
                    @ionChange="amount = $event.target.value"
                  ></ion-input>
                </ion-item>
                <div class="ion-float-right ion-margin-top ion-margin-bottom">
                  <ion-button fill="outline" color="danger">
                    <ion-icon name="close-circle-outline"></ion-icon
                    >Clear</ion-button
                  >
                  <ion-button @click="AddSpending()" color="primary"
                    >+ AJOUTER DEPENSE</ion-button
                  >
                </div>
              </ion-card-content>
            </ion-card>
            <ion-list>
              <p>Vous avez un total de {{ spendings.length }} dépenses.</p>
              <ion-item>
                <ion-label>Liste des dépenses</ion-label>
              </ion-item>
            </ion-list>
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
} from "@ionic/vue";
import { defineComponent } from "vue";
import { addIcons } from "ionicons";
import { closeCircleOutline } from "ionicons/icons";

addIcons({
  "close-circle-outline": closeCircleOutline,
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
    };
  },

  methods: {
    DisplayText() {
      console.log("Bouton fonctionnel!");
    },
    AddSpending() {
      this.spendings.push(new Spending(this.description, this.amount));
      console.log(this.spendings);
    },
  },
});
</script>

<style scoped>
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