import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "../services/firebase";
import { Spending } from "../beans/Spending";
import { Category } from "../beans/Category"
import { alertController} from "node_modules/@ionic/core/dist/types/utils/overlays.d.ts"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    description: "",
    amount: "",
    spendings: new Array(Spending),
    total: 0,
    categories: new Array(Category),
    name: Category.name,
    db: firebase.ref().child("/spendings"), //ajout de la suite du lien de l'app avec /spendings
    key: firebase.ref().key, // récupération des clés de la db firebase
  },
  getters: {
    getAmount(state) {
      return state.amount;
    },
    getSpendings: (state) => {
      return state.spendings;
    },
    getTotal: (state) => {
      return state.total;
    },
    getDb: (state) => {
      return state.db;
    },
    getBdKey: (state) => {
      return state.key;
    },
  },
  actions: {
    async pushSpendings(context) {
      try {
        this.db.once("value", (snapshot) => {
          snapshot.forEach((element) => {
            let dbSpending = element.val()
            dbSpending = new Spending; // cast en objet Spending
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
    addSpending(context) {
      // relever une erreur si champs vides ou montant incorrect
      if (!this.amount || !this.description || parseInt(this.amount) < 0) {
        this.presentAlertCheckInputs();
      } else {
        // une nouvelle dépense se nomera newSpending
        const newSpending = new Spending(this.description, this.amount);

        //DB
        const dbSpending = this.db.push(newSpending); // on push newSpending dans la db

        newSpending.key = dbSpending.key.toString(); // je coordonne l'id de la db avec la locale

        //LOCAL
        this.spendings.push(newSpending); // on rentre description et amount dans le tableau des spendings
        context.commit("fillSpendings", this.spendings)

        this.sumAmounts(); // on fait le total
        this.amount = ""; // on vide les champs
        this.description = "";
      }
    },
    sumAmounts(context) {
      // pour chaque item Spending de mon tableau spendings j'ajoute le montant des items au total
      this.total = 0;
      this.spendings.forEach((item) => (this.total += item.amount));
    },

    //alert configurée dans une méthode issue de la doc Ion-alert
    async presentAlertCheckInputs(context) {
      const alert = await alertController.create({
        header: "Alert",
        subHeader: "Valeur non correcte",
        message: "Veuillez remplir les champs correctement",
        buttons: ["OK"],
      });
      return alert.present();
    },

    clearAll(context){
      this.spendings.length = 0;
      this.total = 0;
      this.amount = "";
      this.description = "";
      this.db.remove();
    },

    removeOneSpending(context, key) {
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

  },

  mutations: {
    fillSpendings(state, spendings) {
      state.spendings = spendings;
    },
    toggleModal(state) {
      state.modals.isAddModalOpened = !state.modals.isAddModalOpened;
    },
  }
})