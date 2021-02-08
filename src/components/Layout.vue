import { IonApp } from '@ionic/vue';
<template>
  <ion-page>
    <ion-header :translucent="true"> 
      <Toolbar/>
    </ion-header>
    <ion-content> 
      <slot name="content"></slot>
    </ion-content>
  </ion-page>
</template>

<script>
import Toolbar from "../components/Toolbar.vue";
import { ionPage, IonHeader, IonContent } from "@ionic/vue";

export default {
  name: "Layout",

  components: { ionPage, IonHeader, IonContent, Toolbar },

};
</script>

<style>
</style>