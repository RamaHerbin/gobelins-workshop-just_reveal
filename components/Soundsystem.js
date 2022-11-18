import {Howl, Howler} from 'howler';

let globalvolume = 1.

export const bgSound = new Howl({
    src: ['/audio/xp/ambient_bg.mp3'],
    loop: true,
    volume: 0.6 * globalvolume,
    autoplay:false,
  });

  export const startSound = new Howl({
    src: ['/audio/xp/swoosh.mp3'],
    volume: 0.2 * globalvolume,
    autoplay:false,
  });


  export const scrollSound = new Howl({
    src : ['/audio/xp/scroll_single.mp3'],
    volume: 1.1 * globalvolume,
    autoplay:false,
  })


  export const longswooshSound = new Howl({
    src : ['/audio/xp/swoosh.mp3'],
    volume: 0.2 * globalvolume,
    autoplay:false,
  })

  export const shortswooshSound = new Howl({
    src : ['/audio/xp/swoosh2.mp3'],
    volume: 0.4 * globalvolume,
    autoplay:false,
  })



// ------------------- //

  export const animalSound = new Howl({
    src : [
      '/audio/animaux/dolphin.mp3',
      '/audio/animaux/gorille.mp3',
      '/audio/animaux/owl.mp3',
      '/audio/animaux/rhino.mp3',
      '/audio/animaux/road.mp3',
      '/audio/animaux/turtle.mp3',
    ],
    volume: 0.2 * globalvolume,
    autoplay:false,
  })

  // export const gorillaSound = new Howl({
  //   src : ['/audio/xp/gorille.mp3'],
  //   volume: 0.2 * globalvolume,
  // })

  // export const owlSound = new Howl({
  //   src : ['/audio/xp/owl.mp3'],
  //   volume: 0.2 * globalvolume,
  // })



  export const VoxSound = new Howl({
    src : ['/audio/vox_news_wet/allemagne.mp3',
         '/audio/vox_news_wet/asian.mp3',
         '/audio/vox_news_wet/australia.mp3',
         '/audio/vox_news_wet/canada.mp3',
         '/audio/vox_news_wet/china.mp3',
         '/audio/vox_news_wet/crapaud.mp3',
         '/audio/vox_news_wet/france.mp3',
         '/audio/vox_news_wet/india.mp3',
         '/audio/vox_news_wet/indonesia.mp3',
         '/audio/vox_news_wet/italia.mp3',
         '/audio/vox_news_wet/japan.mp3',
         '/audio/vox_news_wet/jesp.mp3',
         '/audio/vox_news_wet/jps.mp3',
         '/audio/vox_news_wet/mexico.mp3',
         '/audio/vox_news_wet/northindia.mp3',
         '/audio/vox_news_wet/portugal.mp3',
         '/audio/vox_news_wet/scotland.mp3',
         '/audio/vox_news_wet/uk.mp3',
          ],
    volume: 0.5 * globalvolume,
  })


  // document.querySelector('.start-button').addEventListener('click', () => {
  //   if(!bgSound.playing()) {
  //     bgSound.play();
  // bgSound.fade(0, 0.6, 1000);
  //   }
  //  } 
  // )