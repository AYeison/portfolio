

export const map_key_exist = (key, obj, callback)=>{
    if(obj.hasOwnProperty(key)){
      callback(key, obj);
    }else{
        return;
    }
}
export function Mirai_event_maps({atts, triggers : triggers = null}){
      this.map = {};
      this.atts = atts;
      this.triggers = triggers;

      for(let att of this.atts){

        this.map[att] = {};
        
        if(triggers != null){
          for(let trigger of this.triggers){
            if(att === trigger.parent_id){
              this.map[att][trigger.id] = (args)=> trigger.event(args);
            }
           
          }
        }
       
        
      }

}
Mirai_event_maps.prototype.test = function() {
  console.log(this.map);
};
Mirai_event_maps.prototype.hasTagname = function(target, callback) {
  let response;
  
   for(let name of this.atts){
        if(target.tagName === name){
          callback(name);
          response = true;
        }else{
          response = false;
        }
   }
 

  return response;
};
Mirai_event_maps.prototype.targetHasAtt = function(target, callback) {
  let response;
  
   for(let name of this.atts){

        if(target.hasAttribute(name) || target.closest(`[${name}]`)){
          const targetEl = target.closest(`[${name}]`) ? target.closest(`[${name}]`) : target; 
          callback({att_name : name, targetEl});
          response = true;
        }else{
          response = false;
        }
   }
 

  return response;
};
Mirai_event_maps.prototype.exist = function(key, callback) {
  let response;
  
   for(let name of this.atts){
    const map_att = this.map[name];
    if(map_att.hasOwnProperty(key) && callback instanceof Function){
      callback(map_att[key]);
      response = true;
    }else{
      response = false;
    }
   }
 

  return response;
};

Mirai_event_maps.prototype.set_map_event = function (key, args) {
    const await_args = args
    let response = null;
     
      this.exist(key, (fn_event)=>{
        response = fn_event;

        fn_event(await_args);
       
      });
    

    return response;
}



