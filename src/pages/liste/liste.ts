import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite,SQLiteObject } from '@ionic-native/sqlite';


@IonicPage()
@Component({
  selector: 'page-liste',
  templateUrl: 'liste.html',
})
export class ListePage {

  public etudiants1: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sqlite: SQLite) {
    this.etudiants1=this.navParams.get("etudiants");  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListePage');
  }



  deleteData(prenom) {
    this.sqlite.create({
      name: 'ionicdb104.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM etudiant WHERE prenom=?', [prenom])
      .then(res => {
        console.log(res);
        this.getData();
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }


  public getData():void {
    this.sqlite.create({
      name: 'ionicdb104.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

          db.executeSql('SELECT * FROM etudiant ', {})
            .then(res => {
              this.etudiants1 = [];
              for(var i=0; i<res.rows.length; i++) {
                this.etudiants1.push({prenom:res.rows.item(i).prenom,nom:res.rows.item(i).nom,groupe:res.rows.item(i).groupe});  
              }    

          })
          .catch(e => console.log(e));      
        
    }).catch(e => console.log(e));
  }



}
