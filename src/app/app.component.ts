import { Component } from '@angular/core';
import { FolderStructureComponent } from './folder-structure/folder-structure.component';
import { NodeModel } from '../node.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'folder-structure-maker';
  public items:NodeModel[] = [];
  public idCtr:number = 0;

  ngOnInit():void{
  }
  
  public addFolderToRoot():void{
    let newNode = <NodeModel>{id: String(this.idCtr), type:'unset',name:'', children:[]};
    this.items = [...this.items, newNode];
    this.idCtr++;
  }
}
