

export default function yadev_animation_pt(args={}){
    let await_args = {};

    if(0 < Object.keys(args).length && args.constructor === Object){
        await_args = args;
    }
    const {gsap : gsap = null,  map_key_exist : map_key_exist=null, Mirai_event_maps : Mirai_event_maps = null, Tabs : Tabs = null, Swiper : Swiper = null} = await_args;
    /**helpers */
    const pcontainer = document.getElementById('p-container');
    const bgly3 = document.getElementById('bgly3');

    let 
    tl,
    tl2,
    html = '',
    count = 60;
   
    const randomP = function (min, max ){
        return Math.floor(Math.random() * (1 + max - min) + min);
    }

    const cloneRp = function () {
        if(!tl){
            return null;
        }

            for(let i =0; i < count; i++){
                html += '<div></div>';
            }

            pcontainer.innerHTML = html;
      
    }

    const createPAnim = function (events) { 
        const {randomP, cloneRp} = events;
      let 
      w =  bgly3.width,
      h = bgly3.height;
      pcontainer.width = w;
      pcontainer.height = h;
      
        tl = gsap.timeline({
            repeat: -1
        });
        tl2 = gsap.timeline({
            repeat: -1,
            repeatDelay: 2
        });
        cloneRp();

        const dots = document.querySelectorAll('#p-container > div');
         
        dots.forEach(element => {
           tl.add(gsap.fromTo(element,
           {
               x : randomP(-(0.4 * w), 0.4 * w),
               y:  randomP(-(0.4 * h), 0.4 * h),
               z : randomP(-300, 0),
               opacity: randomP(3, 7) / 10
           },
           {
               x : '+=' + randomP(-(0.4 * w), 0.4 * w),
               y:  '+=' + randomP(-(0.7 * h), 0.7 * h),
               z : '+=' + randomP(-200, 200),
               opacity: randomP(4, 8) / 10,
               repeat : 1,
               yoyo: true,
               ease: 'sine.inOut',
               duration: 7
           }),
           0
           );

        });

        tl2.fromTo(pcontainer, {
            perspective: 200
            
        },
        {
            perspective : 700,
            repeat : 1,
            repeatDelay : 2,
            yoyo: true,
            ease:'sine.inOut',
            duration: 3
        })

     } 

    return {
        createPAnim : () => createPAnim({randomP, cloneRp})
    }

}