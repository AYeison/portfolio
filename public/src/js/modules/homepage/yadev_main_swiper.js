

export default function yadev_main_swiper(args = {}){
  
    let await_args = {};

    if(0 < Object.keys(args).length && args.constructor === Object){
        await_args = args;
    }
    const {gsap : gsap = null,  map_key_exist : map_key_exist=null, Mirai_event_maps : Mirai_event_maps = null, Tabs : Tabs = null, Swiper : Swiper = null, pAnim : pAnim = null} = await_args;

    if(pAnim){
      pAnim();

      document.addEventListener('resize', pAnim());
    }

    let one_line_bullet = false;
    let vheight = window.innerHeight;
    let spaces;
    const tiempoDeInactividad = 1000;
    let lastMouseX = null;
    let lastMouseY = null;  
    let event_move = null;
    let nomove = false;
    let timer =  null;

    const update_params = (swiper)=>{
        const pagination = swiper.pagination.el;
        const bullets = document.querySelectorAll('.swiper-pagination-bullet');
        const oneline_bullet = document.querySelector('.oneline_bullet');
       
       const total_slide = document.querySelectorAll('.swiper-slide') ? document.querySelectorAll('.swiper-slide').length : null;
       vheight = window.innerHeight;
 
       oneline_bullet.style.height = vheight  + 'px';
       pagination.style.height = vheight  + 'px';
       
       spaces = fk_math(vheight, total_slide);
      
      
       bullets.forEach(bullet => {
         bullet.style.margin = spaces + 'px ' + '0px';
       })
 
      
     }
    const fk_math = (height, total_slide)=>{
        const calc_sep = Math.round((height / total_slide) / 2);
       
        return calc_sep;
  
      }
      const init_swiper = (e)=> {
        if(!Swiper){
            return null;
        }
        const total_slide = document.querySelectorAll('.swiper-slide') ? document.querySelectorAll('.swiper-slide').length : null;
        var swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            speed: 800,
            allowTouchMove: true,
            mousewheelControl: true,
            simulateTouch : true,
            mousewheel: {
                sensitivity: 100
              },
            slidesPerView: 1,
            scrollbar: {
                el: ".swiper-scrollbar",
                draggable : true,
                enabled:true
              },
              pagination: {
                el: ".swiper-pagination",
                clickable: true,
                renderBullet: function (index, className) {
                const slides = document.querySelectorAll('.swiper-slide');
                const slides_title = slides[index].hasAttribute('data-title') ? slides[index].getAttribute('data-title') : 'notitle';


                  spaces = fk_math(vheight, total_slide);
                    return   '<span class="' + className + ' relative z-10" style="margin:'+spaces+`px 0px"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="w-5 h-5" viewBox="0 0 512 512"> <defs>
                    <filter id="filter" filterUnits="userSpaceOnUse">
                      <feFlood result="flood" flood-color="#fff"/>
                      <feComposite result="composite" operator="in" in2="SourceGraphic"/>
                      <feBlend result="blend" in2="SourceGraphic"/>
                    </filter>
                  </defs>
                  <g id="Grupo_1" data-name="Grupo 1" class="cls-1">
                    <circle id="Elipse_1" data-name="Elipse 1" class="cls-2" cx="256" cy="256" r="226"/>
                    <circle id="Elipse_1_copia" data-name="Elipse 1 copia" class="cls-3" cx="256" cy="256" r="180.938"/>
                  </g>
                </svg><span>`+slides_title +'</span></span>';
                  },
                 
              },       
              keyboard: {
                enabled: true
            },
            on:{
                resize: update_params,
                paginationRender: function (swiper , el){
                    const footer = document.querySelector('.site-footer');
                    if(!one_line_bullet){
                      const  html_line_bullet = document.createElement('div');
                      html_line_bullet.className = 'absolute w-[3px]  oneline_bullet top-1/2 left-3 -translate-y-1/2 z-0';
                      html_line_bullet.style.height = vheight + 'px';
                      el.style.height = vheight + 'px';
                      el.appendChild(html_line_bullet);
                    }
                    one_line_bullet = true;
                    console.log(footer.clientHeight)
                   
                  },
                  slideChange : function(swiper){
                    let t;
                      if(0 < swiper.realIndex && 1 != swiper.previousIndex){
                        const site_header = document.querySelector('.site-header');
                        const style_header = getComputedStyle(site_header);
                        if(t){
                          t.clearProps('top');
                          t.pause();
                      } 
                      console.log(swiper.realIndex, style_header.top);
                      if('-300px' != style_header.top){
                        t = gsap.to('.site-header', {top:-300, duration:0.3});
                      }

                      }else if(swiper.realIndex === 0){
                        if(t){
                          t.clearProps('top');
                          t.pause();
                      }
                      
                          t = gsap.to('.site-header', {top:0, duration:0.3});
                        
                       
                      }

                      
                  }
            }
          });

         
      }
      function detectarInactividad() {
       
        const mirai_read_control = document.querySelector('.swiper-pagination');
         let t;
        if(event_move){
            const currentMouseX = !event_move.touches ? event_move.clientX : event_move.touches[0].clientX;
            const currentMouseY = !event_move.touches ? event_move.clientY : event_move.touches[0].clientY;
  
       
            if (lastMouseX === null && lastMouseY === null) {
                // Esta es la primera vez que se detecta la posición del puntero
                lastMouseX = currentMouseX;
                lastMouseY = currentMouseY;
              } else if (currentMouseX === lastMouseX && currentMouseY === lastMouseY) {
                // El puntero no se ha movido durante el tiempo de inactividad especificado
                if(t){
                  t.clearProps('opacity,display');
                  t.pause();
                      }
               
                 
                 
                  t = gsap.to(mirai_read_control,  {display:'none', opacity:0,  duration:1}); nomove = false;
               
              } else {
                // El puntero se ha movido, restablecer el temporizador y la posición
                if(t){
                  t.clearProps('opacity,display');
                 t.pause();
                      }
               
                  t = gsap.from(mirai_read_control,  {display:'block', opacity:1, duration:1}); 
                  nomove = true;
              
         
             
                lastMouseX = currentMouseX;
                lastMouseY = currentMouseY;
                clearTimeout(timer);
                timer = setTimeout(detectarInactividad, tiempoDeInactividad);
              }
        }else{
         gsap.fromTo(mirai_read_control, { display:'block', opacity:1}, {display:'none', opacity:0, duration:1});
            nomove = false;
        }
      }
      timer = setTimeout(detectarInactividad, tiempoDeInactividad);
   
    document.addEventListener('mouseover', (e)=>{
        event_move = e;
      
        detectarInactividad();
    });
  
    document.addEventListener('touchstart', (e) => {
        event_move = e;
        detectarInactividad();
    });
    
    document.addEventListener('touchmove', (e) => {
        event_move = e;
       
        detectarInactividad();
    });


      document.addEventListener('DOMContentLoaded', init_swiper);
}