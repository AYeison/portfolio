
export default function yadev_main_swiper(args = {}){
  
    let await_args = {};

    if(0 < Object.keys(args).length && args.constructor === Object){
        await_args = args;
    }
    const {gsap : gsap = null,  map_key_exist : map_key_exist=null, Mirai_event_maps : Mirai_event_maps = null, Tabs : Tabs = null, Swiper : Swiper = null} = await_args;

    let one_line_bullet = false;
    let vheight = window.innerHeight;
    let spaces;
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
            mousewheelControl: true,
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
                    return   '<span class="' + className + ' relative z-10" style="margin:'+spaces+'px 0px"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" class="w-5 h-5"><path  d="M37,13L29,3l5.5,10L25,22V5l1-2l-1.5,0.5L24,1l-0.5,2.5L22,3l1,2v17l-9.5-9L19,3l-8,10l11,10.5L11,34	l12,12l1,1l1-1l12-12L26,23.5L37,13z M14.5,34l8.5-8.5v17.447L14.5,34z M33.5,34L25,42.947V25.5L33.5,34z"/></svg><span>'+slides_title +'</span></span>';
                  },
                 
              },       
              keyboard: {
                enabled: true
            },
            on:{
                resize: update_params,
                paginationRender: function (swiper , el){
                    if(!one_line_bullet){
                      const  html_line_bullet = document.createElement('div');
                      html_line_bullet.className = 'absolute w-px  oneline_bullet top-1/2 left-3 -translate-y-1/2 z-0';
                      html_line_bullet.style.height = vheight + 'px';
                      el.style.height = vheight + 'px';
                      el.appendChild(html_line_bullet);
                    }
                    one_line_bullet = true;
                   
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



      document.addEventListener('DOMContentLoaded', init_swiper);
}