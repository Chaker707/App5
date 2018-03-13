import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';
import {ListePage} from '../liste/liste'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public etudiants: any = [];

  prenom:string='';
  nom:string='';
  groupe:string='';
  

  constructor(public navCtrl: NavController,private sqlite: SQLite, public alertCtrl: AlertController) {
  
    this.getData();

  }
 


  public ajouterEtudiant():void {
    this.sqlite.create({
      name: 'ionicdb104.db',
      location: 'default'
    }).then((db: SQLiteObject) => { 

          db.executeSql('INSERT INTO etudiant (prenom,nom,groupe) VALUES ("'+this.prenom+'","'+ this.nom+'","'+ this.groupe+'") ', {})
              .then(res => console.log('Executed SQL'))
              .catch(e => console.log(e));       
          this.prenom='';          this.nom='';         this.groupe='';
          db.executeSql('SELECT * FROM etudiant ', {})
            .then(res => {
                this.etudiants = [];
                for(var i=0; i<res.rows.length; i++) {
                  this.etudiants.push({prenom:res.rows.item(i).prenom,nom:res.rows.item(i).nom,groupe:res.rows.item(i).groupe});  
                }    
            })
            .catch(e => console.log(e));
        
          let alert = this.alertCtrl.create({
              title: 'Test Alert1 ENIG',
              subTitle: 'Etudiant ajouté avec succès !! ',
              buttons: ['OK']
            });
            alert.present();

    }).catch(e => console.log(e));
  }


public getData():void {
    this.sqlite.create({
      name: 'ionicdb104.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

          db.executeSql('CREATE TABLE IF NOT EXISTS etudiant ( prenom TEXT, nom TEXT, groupe TEXT ) ', {})
          .then(res => console.log('Executed SQL'))
          .catch(e => console.log(e));

          db.executeSql('SELECT * FROM etudiant ', {})
            .then(res => {
              this.etudiants = [];
              for(var i=0; i<res.rows.length; i++) {
                // this.produits.push(res.rows.item(i).id)
                this.etudiants.push({prenom:res.rows.item(i).prenom,nom:res.rows.item(i).nom,groupe:res.rows.item(i).groupe});  
              }    

          })
          .catch(e => console.log(e));      
        
    }).catch(e => console.log(e));
  }



  fonctionB1(){
    this.getData();
    this.navCtrl.push(ListePage, {  etudiants:this.etudiants   }   );
  }


}
