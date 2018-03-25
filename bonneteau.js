$( document ).ready(function() {
  $('.newGame').on('click', (e) => {
    $(e.target).text('Restart');
    $('.text').empty();
    g = game.initialize();
  })
});

game = {
  goblets: [],
  max: 3,
  swapNumber: 5,
  initialize: function() {
    this.swapCount = 0;
    this.addGoblets();
    this.addBall();
    this.swap();

  },
  addGoblets: function() {
    $('.table').empty();
    let gobletsPositions = ['left', 'center', 'right'];
    gobletsPositions.forEach((el, index) => {
      let goblet = {
        element: $('<div class="goblet '+el+'" id="'+ el +'"></div>'),
        position: el,
        hasBall: false
      }

      this.goblets[index] = goblet;

      $('.table').append(goblet.element);
    });
  },
  swap: function() {

    setTimeout( () => {
      console.log('swap'+ this.swapCount);

      indexToMove1 = this.chooseRandGoblet(this.max);
      indexToMove2 = this.chooseRandGoblet(this.max);

      while(indexToMove1 == indexToMove2){
        indexToMove2 = this.chooseRandGoblet(this.max);
      }

      tmpGoblet1 = Object.assign({}, this.goblets[indexToMove1]);
      tmpGoblet2 = Object.assign({}, this.goblets[indexToMove2]);

      tmpGoblet1.element = tmpGoblet1.element.attr('id', this.goblets[indexToMove2].position);
      tmpGoblet1.position = this.goblets[indexToMove2].position

      tmpGoblet2.element = tmpGoblet2.element.attr('id', this.goblets[indexToMove1].position);
      tmpGoblet2.position = this.goblets[indexToMove1].position

      this.goblets.splice(indexToMove1, 1, tmpGoblet2)
      this.goblets.splice(indexToMove2, 1, tmpGoblet1)
      this.swapCount++;

      if(this.swapCount < this.swapNumber) {
        this.swap();
      }else {
        this.initGobletChoice();
      }
    }, 1000);
  },
  chooseRandGoblet: (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  },
  addBall: function() {
    this.goblets[1].hasBall = true;

    $(this.goblets[1].element).append('<span class="ball"></span>');

    setTimeout( () => {
      $(this.goblets[1].element).empty();
    }, 1000);
  },
  initGobletChoice: function() {
    $('.goblet').on('click', (e) => {
      this.resolve(e.target)
    });
  },
  getChoice: function(choice) {
    console.log($(choice).attr('id'));
    return this.goblets.filter(goblet => goblet.position === $(choice).attr('id'));
  },
  getSolution: function() {
    return this.goblets.filter(goblet => goblet.hasBall === true);
  },
  resolve: function(target) {
    let choice = this.getChoice(target)[0];
    const solution = this.getSolution()[0];

    $('.goblet').off();
    $(solution.element).append('<span class="ball"></span>');

    if(solution.position == $(target).attr('id')) {
      $(target).addClass('win');
      $('.text').append('<p>Bravo !</p>');
    }else {
      $(target).addClass('fail');
      $('.text').append('<p>Perdu !</p><p>Une autre partie ?</p>');
    }
  }
}