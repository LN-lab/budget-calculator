<template>
  <Layout>
    <template #content>
      <ion-grid>
        <ion-row>
          <!--1 ligne 1 colonne qui prend la moitié de 12 dès qu'on dépasse la taille md. on la décale de 3 pour la centrer-->

          <ion-col size-md="6" offset-md="3">
            <ion-card class="ion-padding">
              <ion-card-header class="ion-margin">
                <ion-text class="ion-text-justify">Mes listes</ion-text>
              </ion-card-header>

              <ion-list v-for="list in lists" :key="list.id">
                <ion-item class="ion-margin-start">
                  <ion-grid>
                    <ion-row class="ion-justify-content-around">
                      <ion-col size="3">
                        <router-link to="/spendings"
                          >{{ list.name }}
                        </router-link>
                        </ion-col>
                      <ion-col size="3">
                        <router-link to="/spendings">{{
                          "Total : " + list.totalSpendings + " €"
                        }}</router-link>
                        </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-item>
              </ion-list>

              <ion-button class="ion-padding ion-margin" @click="openPopover"
                >Nouvelle liste</ion-button
              >
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </template>
  </Layout>
</template>

<script lang="ts">
import Layout from "../components/Layout.vue";
import Popover from "./Popover.vue";
import { defineComponent } from "vue";
import { List } from "../beans/List";
import { Spending } from "../beans/Spending";
import {
  IonText,
  IonCardHeader,
  IonList,
  IonButton,
  IonCard,
  popoverController,
  IonGrid,
  IonCol,
  IonRow,
  IonItem,
} from "@ionic/vue";

export default defineComponent({
  name: "Home",
  components: {
    Layout,
    IonText,
    IonCardHeader,
    IonList,
    IonButton,
    IonCard,
    IonGrid,
    IonCol,
    IonRow,
    IonItem,
  },
  data() {
    return {
      lists: Array<List>(),
    };
  },

  methods: {
    async openPopover(ev: Event) {
      const popover = await popoverController.create({
        component: Popover,
        cssClass: "my-custom-class",
        event: ev,
        translucent: true,
      });
      popover.onDidDismiss().then((listName) => {
        console.log(listName);
        if (listName.role != "backdrop" && listName.data != "") {
          const newList = new List(listName.data, new Array<Spending>(), 45);
          this.lists.push(newList);
        }
      });
      return popover.present();
    },
  },
});
</script>

<style>
ion-card-header {
  font-size: 2rem;
}
router-link {
  background: red;
}
</style>