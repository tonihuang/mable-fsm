import { Component, ElementRef, EventEmitter, Input, OnInit, OnChanges, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { NodeModel } from 'src/node.model';

@Component({
  selector: 'folder-structure',
  templateUrl: './folder-structure.component.html',
  styleUrls: ['./folder-structure.component.scss']
})
export class FolderStructureComponent implements OnInit, OnChanges {
  @Input() items: NodeModel[];
  @Input() parent: number = -1;
  @Output() childUpdated = new EventEmitter<{updatedNodeId:number, updatedNode:NodeModel[]}>();
  @ViewChildren('inputNodeName') inputNodeName: QueryList<ElementRef>;
  public newNodeName:string = '';
  public newNodeType:any = 'unset';
  private idCtr:number = 0;

  constructor() { }

  ngOnInit(): void {
    this.initNodeType();
  }

  private initNodeType():void{
    if (this.parent == -1) {
      this.newNodeType='folder';
    }else{
      this.newNodeType='unset';
    }
  }

  private clearInput():void{
    this.newNodeName='';
    this.initNodeType();
  }

  public setNewNodeType(type: string): void{
    this.newNodeType = type;
    let self=this;
    setTimeout(function(){self.updateFocus()}, 250);
  }

  public setNewNodeName(id: string, nodeName: string): void{
    var index = this.items.findIndex(function(item, i){
      return item.id === id
    });
    if (nodeName == ''){
      this.items.splice(index,1);
      return;
    }
    this.items[index].name = nodeName;
    this.items[index].type = this.newNodeType;
    this.clearInput();
    /*--when using event emitter instead of ngOnChanges*/
    if(this.parent !== -1){
      this.childUpdated.emit({updatedNodeId: this.parent, updatedNode:this.items });
    }
  }

  public deleteNode(id: string): void{
    var index = this.items.findIndex(function(item, i){
      return item.id === id
    });
    this.items.splice(index,1);
    this.clearInput();
  }

  public updateFocus(): void{
    if(this.items.length > 0){
      var index = this.items.findIndex(function(item, i){
        return item.type === 'unset'
      });
      this.inputNodeName.toArray()[0].nativeElement.focus();
    }
  }

  public addChild(id: string):void{
    var index = this.items.findIndex(function(item, i){
      return item.id === id
    });
    let newNode = <NodeModel>{id: String(this.idCtr), type:'unset',name:'', children:[]};
    this.items[index].children = [...this.items[index].children, newNode];
    this.idCtr++;
  }

  public updateNode(e:any):void{
    /* another approach using Event Emitter */
    /*var index = this.items.findIndex(function(item, i){
      return item.id === e.updatedNodeId.toString()
    });
    console.log(this.items[index]);
    */
  }

  ngOnChanges(changes: SimpleChanges) {
    let self = this;
    // can use observable for this but need further refactoring
    if (this.parent == -1 || (this.parent !== -1 && this.newNodeType!=='unset')) {
      setTimeout(function(){self.updateFocus()}, 250);
    }
  }

}
