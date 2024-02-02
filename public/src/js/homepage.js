import yadev_main_swiper from "./modules/homepage/yadev_main_swiper";
import yadev_animation_pt from "./modules/homepage/yadev_animation_pt";
import gsap from 'gsap';

// core version + navigation, pagination modules:
import Swiper from 'swiper/bundle';



/**Declarete particles  anim*/

const pt_anim = yadev_animation_pt ({
    gsap,
})
const createAnim = pt_anim.createPAnim;


/**inizialization swipper main*/
yadev_main_swiper({
    gsap,
    Swiper,
    pAnim : createAnim
});


