function mirror(options) {

  var optionsFixed = {};

  var p = ['right', 'left'];
  var r = ['left', 'right'];

  _.each(options, function(value, key) {
    if (p.indexOf(key) !== -1) {
      optionsFixed[r[p.indexOf(key)]] = value;
    } else {
      optionsFixed[key] = mirror(value);
    }
  });
  return optionsFixed;
}

var en = {
    common: {
      leftTextAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
      rightTextAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
      'left': 'left',
      'right': 'right'
    },
    events: {
      thumbnailImageView: {
        left: 10
      },
      titleLabel: {
        left: 100
      }
    },
    posts: {
      index: {
        titleLabel: {
          left: 0
        },
        dateLabel: {
          left: 0
        }
      },
      post: {
        leftBorder: {
          left: 0
        },
        datePrettyLabel: {
          left: 17
        }
      }
    },
    agenda: {
      index: {
        lineView: {
          left: 112
        },
        startdatePrettyLabel: {
          left: 0
        },
        iconLabel: {
          left: 90
        },
        titleLabel: {
          left: 136,
          right: 10
        }
      }
    },
    speakers: {
      index: {
        titleLabelContainnerView: {
          left: 0
        }
      },
      child: {
        infoImageView: {
          left: 0
        },
        aboutLabel: {
          left: 33
        }
      }
    },
    more: {
      index: {
        thumbnailImageView: {
          left: 5
        },
        titleLabel: {
          left: 50
        }
      }
    }
  },
  ar = _.extend(mirror(en), {
    common: {
      'leftTextAlign': Ti.UI.TEXT_ALIGNMENT_RIGHT,
      'rightTextAlign': Ti.UI.TEXT_ALIGNMENT_LEFT,
      'left': 'right',
      'right': 'left'
    }
  });

exports.generate = function() {
  Alloy.CFG.tss = Ti.Locale.currentLanguage === 'ar' ? ar : en;
};
