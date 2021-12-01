const game_presets = require('../models/game_preset_model.js');


// FAST:
const fast_and_simply = new game_presets({
  name: "fast and simply",
  settings: {
    is_rating: true,
    is_sync: true,
    max_players: 2,
    win_condition: {
      mode: "score",
      value: 25
    },
    modes: [
      {
        name: "add",
        difficulty: 1
      },
      {
        name: "subtract",
        difficulty: 1
      },
      {
        name: "multiply",
        difficulty: 1
      },
      {
        name: "division",
        difficulty: 1
      }
    ]
  }
});
const fast_and_normally = new game_presets({
  name: "fast and normally",
  settings: {
    is_rating: true,
    is_sync: true,
    max_players: 2,
    win_condition: {
      mode: "score",
      value: 25
    },
    modes: [
      {
        name: "add",
        difficulty: 2
      },
      {
        name: "subtract",
        difficulty: 2
      },
      {
        name: "multiply",
        difficulty: 2
      },
      {
        name: "division",
        difficulty: 2
      }
    ]
  }
});
const fast_and_hard = new game_presets({
  name: "fast and hard",
  settings: {
    is_rating: true,
    is_sync: true,
    max_players: 2,
    win_condition: {
      mode: "score",
      value: 25
    },
    modes: [
      {
        name: "add",
        difficulty: 3
      },
      {
        name: "subtract",
        difficulty: 3
      },
      {
        name: "multiply",
        difficulty: 3
      },
      {
        name: "division",
        difficulty: 3
      }
    ]
  }
});

// MEDIUM:
const medium_and_simply = new game_presets({
  name: "medium and simply",
  settings: {
    is_rating: true,
    is_sync: true,
    max_players: 2,
    win_condition: {
      mode: "score",
      value: 50
    },
    modes: [
      {
        name: "add",
        difficulty: 1
      },
      {
        name: "subtract",
        difficulty: 1
      },
      {
        name: "multiply",
        difficulty: 1
      },
      {
        name: "division",
        difficulty: 1
      }
    ]
  }
});
const medium_and_normally = new game_presets({
  name: "medium and normally",
  settings: {
    is_rating: true,
    is_sync: true,
    max_players: 2,
    win_condition: {
      mode: "score",
      value: 50
    },
    modes: [
      {
        name: "add",
        difficulty: 2
      },
      {
        name: "subtract",
        difficulty: 2
      },
      {
        name: "multiply",
        difficulty: 2
      },
      {
        name: "division",
        difficulty: 2
      }
    ]
  }
});
const medium_and_hard = new game_presets({
  name: "medium and hard",
  settings: {
    is_rating: true,
    is_sync: true,
    max_players: 2,
    win_condition: {
      mode: "score",
      value: 50
    },
    modes: [
      {
        name: "add",
        difficulty: 3
      },
      {
        name: "subtract",
        difficulty: 3
      },
      {
        name: "multiply",
        difficulty: 3
      },
      {
        name: "division",
        difficulty: 3
      }
    ]
  }
});

// SLOWLY:
const slowly_and_simply = new game_presets({
  name: "slowly and simply",
  settings: {
    is_rating: true,
    is_sync: true,
    max_players: 2,
    win_condition: {
      mode: "score",
      value: 75
    },
    modes: [
      {
        name: "add",
        difficulty: 1
      },
      {
        name: "subtract",
        difficulty: 1
      },
      {
        name: "multiply",
        difficulty: 1
      },
      {
        name: "division",
        difficulty: 1
      }
    ]
  }
});
const slowly_and_normally = new game_presets({
  name: "slowly and normally",
  settings: {
    is_rating: true,
    is_sync: true,
    max_players: 2,
    win_condition: {
      mode: "score",
      value: 75
    },
    modes: [
      {
        name: "add",
        difficulty: 2
      },
      {
        name: "subtract",
        difficulty: 2
      },
      {
        name: "multiply",
        difficulty: 2
      },
      {
        name: "division",
        difficulty: 2
      }
    ]
  }
});
const slowly_and_hard = new game_presets({
  name: "slowly and hard",
  settings: {
    is_rating: true,
    is_sync: true,
    max_players: 2,
    win_condition: {
      mode: "score",
      value: 75
    },
    modes: [
      {
        name: "add",
        difficulty: 3
      },
      {
        name: "subtract",
        difficulty: 3
      },
      {
        name: "multiply",
        difficulty: 3
      },
      {
        name: "division",
        difficulty: 3
      }
    ]
  }
});


game_presets.collection.drop().then(() => {     
  game_presets.create(fast_and_simply, fast_and_normally, fast_and_hard, 
    medium_and_simply, medium_and_normally, medium_and_hard,
    slowly_and_simply, slowly_and_normally, slowly_and_hard,
    (error) => {
      if(error) {
        console.log(error);
      }
      else{
        console.log("Created!");
      }
  });
}).catch(() => { console.log('doesnot drop game_presets'); })
