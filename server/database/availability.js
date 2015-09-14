var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var availabilitySchema = new Schema({
  A1: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
      }
  },
  B1: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  C1: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  D1: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  E1: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  A2: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  B2: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  C2: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  D2: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  E2: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  A3: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  B3: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  C3: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  D3: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
  E3: {
    availableSpots: {type: Number},
    lowestScore: {type: Number},
    lowestIndex: {type: String},
    matches: {
      exists:{type: String}
    }
  },
}, {toObject:true});

availabilitySchema.set('toObject', { getters: true });



module.exports = mongoose.model('availability', availabilitySchema);

