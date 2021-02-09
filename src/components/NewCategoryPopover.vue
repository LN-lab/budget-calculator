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
    >Ajouter</ion-button>
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
  IonButton
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { Category } from '../beans/Category';
import { Spending } from '../beans/Spending';



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
   //Ajouter une catégorie à ma liste de catégories
  addCategory(){
  const newCategory = new Category(this.name, "", new Array<Spending>())
  return newCategory;
  }
}
});
</script>