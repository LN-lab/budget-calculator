<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Nouvelle liste</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
    <ion-label position="stacked">Entre une nouvelle liste de dépenses : </ion-label>
    <ion-input 
      v-model="name"
      placeholder="nom de la catégorie"></ion-input>
    </ion-item>
    <ion-button
    @click="Dismiss()">Ajouter</ion-button>
  </ion-content>
</template>

<script lang="ts">
import { 
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  popoverController,
} from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'Popover',
  components: {
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonLabel,
    IonInput,
    IonItem,
    IonButton
  },
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      content: 'Content',
      name: "",
    }
  },


 methods: {
//envoyer le nom de la nouvelle liste
  Dismiss() {
  popoverController.dismiss(this.name);
  }
}
});
</script>