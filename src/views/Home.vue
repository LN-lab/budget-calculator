<template>
  <Layout>
    <template #content>
      <ion-card>
        <ion-card-header>
          <ion-text>Catégories de dépenses</ion-text>
        </ion-card-header>
                <ion-list v-for="category in categories" :key="category.id">
        
            <router-link to="/depenses">{{ category }}</router-link>
                </ion-list>
                
        <ion-button
        @click="openModal"
        >Ajouter</ion-button>
        
      </ion-card>
    </template>
  </Layout>
</template>

<script lang="ts">
import Layout from "../components/Layout.vue";
import { Category ,} from "../beans/Category";
import Modal from '../components/Modal.vue';
import { defineComponent, } from 'vue';
import { modalController } from '@ionic/vue';

export default defineComponent({
  name: "Home",
  components: {
    Layout, 
 
  },
  data() {
    return {
     categories: new Array<Category>(),
     name: Category.name,

    };
  },
   methods: {
    async openModal() {
      const modal = await modalController
        .create({
          component: Modal,
          cssClass: 'my-custom-class',
          componentProps: {
            title: 'New Title'
          },
        })
      return modal.present();
    },
  },
});
</script>

<style>
</style>