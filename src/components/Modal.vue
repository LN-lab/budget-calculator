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
    @click="AddCategory()">Ajouter</ion-button>
  </ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';
import { Category } from '../beans/Category';
import { Spending } from '../beans/Spending';



export default defineComponent({
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      content: 'Content',
      name: "",
      

  
    }
  },
  components: { 
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar 
  },

  methods: {
    addCategory(){
      const newCategory = new Category(this.name, "", new Array<Spending>())

    }
  }
});
</script>