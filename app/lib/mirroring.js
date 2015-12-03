function mirror(options) {

  var optionsFixed = {};

  var p = {
    'right': 'left',
    'left': 'right'
  };

  _.each(options, function(value, key) {

    if (typeof value === 'object') {
      optionsFixed[key] = mirror(value);
      return;
    }

    if (key === 'right' || key === 'left') {
      optionsFixed[p[key]] = value;
    }

    if (key === 'image' && value.indexOf('.ltr.') > -1) {
      optionsFixed[key] = value.replace('.ltr.', '.rtl.');
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
      },
      arrowImageView: {
        right: 10,
        image: '/images/arrow.ltr.png'
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
      },
      child: {
        bySpeakerNameLabel: {
          left: 0
        },
        nameLabel: {
          left: 20
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
        },
        settingsLabel: {
          left: 15
        }
      }
    }
  },
  ar = mirror(en);

ar.common = {
  'leftTextAlign': Ti.UI.TEXT_ALIGNMENT_RIGHT,
  'rightTextAlign': Ti.UI.TEXT_ALIGNMENT_LEFT,
  'left': 'right',
  'right': 'left'
};

exports.generate = function() {
  Alloy.CFG.tss = Ti.Locale.currentLanguage === 'ar' ? ar : en;
};
