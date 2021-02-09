<template>
<Layout>
  <template #content>
      <ion-grid>
        <ion-row>
          <!--1 ligne 1 colonne qui prend la moitié de 12 dès qu'on dépasse la taille md. on la décale de 3 pour la centrer-->

          <ion-col size-md="6" offset-md="3">
            <ion-card>
              <ion-card-header>Nom de la catégorie de dépense à selectionner</ion-card-header>
              <ion-card-content>
                <ion-item>
                  <ion-label position="stacked"
                    >Déscription de la dépense :
                  </ion-label>
                  <ion-input
                    :value="description"
                    v-model="description"
                  ></ion-input>
                </ion-item>
                <ion-item>
                  <ion-label position="fixed">Montant : </ion-label>
                  <ion-input type="number" v-model="amount"></ion-input>
                </ion-item>

                <div class="ion-float-right ion-margin-top ion-margin-bottom">
                  <ion-button fill="outline" @click="clearAll()" color="danger">
                    <ion-icon name="close-circle-outline"></ion-icon
                    >Clear</ion-button
                  >
                  <ion-button @click="addSpending()">
                    <ion-icon name="add-sharp"></ion-icon>
                    Ajouter</ion-button
                  >
                </div>
              </ion-card-content>
            </ion-card>
            <ion-list v-for="spending in spendings" :key="spending.description">
              <ion-item>
                <ion-label
                  >{{ spending.description }}: {{ spending.amount }} €
                </ion-label>
                <ion-button @click="removeOneSpending(spending.key)"
                  >Supprimer</ion-button
                >
              </ion-item>
            </ion-list>
            <p>
              Vous avez rentré {{ spendings.length }} dépenses pour un total de
              {{ total }} €.
            </p>
            <router-link to="/">retour</router-link>
          </ion-col>
        </ion-row>
      </ion-grid>
  </template>
</Layout>
 
</template>

<!-------------------------------------------TYPESCRIPT------------------------------------------------->


<script lang="ts">
//création d'une classe item avec une description et un montant

import {
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
  alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { addIcons } from "ionicons";
import { addSharp, closeCircleOutline } from "ionicons/icons";
import firebase from "../services/firebase";
import { Spending } from "../beans/Spending";
import Layout from '../components/Layout.vue';
import { mapGetters } from "vuex";

addIcons({
  "close-circle-outline": closeCircleOutline,
  "add-sharp": addSharp,
});

export default defineComponent({
  name: "EditSpending",

  components: {
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
    Layout
 
  },

    computed: {
    ...mapGetters(["getSpendings"]),
  },

  data() {
    return {
      description: "",
      amount: "",
      spendings: Array<Spending>(),
      total: 0,
      db: firebase.ref().child("/spendings"), //ajout de la suite du lien de l'app avec /spendings
      key: firebase.ref().key, // récupération des clés de la db firebase
    };
  },

  //push des éléments de la db vers mon component en amont (created)
  async created() {
    try {
      this.db.once("value", (snapshot) => {
        snapshot.forEach((element) => {
          const dbSpending = element.val() as Spending; // cast en objet Spending
          const dbKey = element.key;
          this.total += dbSpending.amount; // ajout du montant
          this.spendings.push(
            //ICI
            new Spending(
              dbSpending.description,
              dbSpending.amount.toString(),
              dbKey?.toString()
            )
          );
        });
      });
      console.log(this.spendings);
    } catch (error) {
      console.log("error : " + error);
    }
  },

  methods: {
    checkButton() {
      console.log("Bouton fonctionnel!");
    },

    addSpending() {
      this.checkButton();
      //
      if (!this.amount || !this.description || parseInt(this.amount) < 0) {
        this.presentAlertCheckInputs();
      } else {
        const newSpending = new Spending(this.description, this.amount); // une nouvelle dépense se nomera newSpending

        //DB
        const dbSpending = this.db.push(newSpending); // on push newSpending dans la db

        newSpending.key = dbSpending.key as string; // TO COMMENT

        //LOCAL
        this.spendings.push(newSpending); // on rentre description et amount dans le tableau des spendings

        this.sumAmounts(); // on fait le total
        this.amount = ""; // on vide les champs
        this.description = "";
      }
    },

    sumAmounts() {
      // pour chaque item Spending de mon tableau spendings j'ajoute le montant des items au total
      this.total = 0;
      this.spendings.forEach((item: Spending) => (this.total += item.amount));
    },

    //alert configurée dans une méthode issue de la doc Ion-alert
    async presentAlertCheckInputs() {
      const alert = await alertController.create({
        header: "Alert",
        subHeader: "Valeur non correcte",
        message: "Veuillez remplir les champs correctement",
        buttons: ["OK"],
      });
      return alert.present();
    },

    clearAll: function () {
      this.spendings.length = 0;
      this.total = 0;
      this.amount = "";
      this.description = "";
      this.db.remove();
    },

    removeOneSpending(key: string) {
      console.log(key);
      let index = -1;
      for (let i = 0; i < this.spendings.length; i++) {
        // on boucle sur notre tableau de dépenses
        if (this.spendings[i].key == key) {
          // si notre paramètre key correspond à un index des dépenses
          index = i; // je mets cet index dans une variable index
        }
      }
      console.log(index, this.amount);

      this.db.child(this.spendings[index].key).remove(); // on supprime la clé(qui contient la dépense) de la Db

      this.total -= this.spendings[index].amount;
      this.spendings.splice(index, 1); // on supprime la dépense de la liste en local
    }, // fermeture removeSpending()
  }, // fermeture methods
}); // fermeture export défault
</script>


<!-------------------------------------------STYLE------------------------------------------------->


<style >
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