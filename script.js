
let myRng = new Math.seedrandom();

const offset = 2000;

const vowels = ["aa", "ae", "ah", "ao", "aw", "ay", "eh", "er", "ey", "ih", "iy", "ow", "oy", "uh", "uw"];

const colors = "ruby red | fiery orange | sun-kissed yellow | verdant green | sapphire blue | regal purple | blushing pink | earthy brown | misty gray | raven black | pure white | oceanic turquoise | royal magenta | dreamy lavender | mystic teal | radiant gold | shimmering silver | olive grove | charcoal embers | nightfall indigo | carmine red | tangerine orange | lemon yellow | forest green | electric blue | amethyst purple | fuchsia pink | sienna brown | smoky gray | midnight black | pearl white | aqua turquoise | orchid magenta | lilac lavender | mint teal | metallic gold | sparkling silver | moss olive | graphite charcoal | deep indigo | maroon red | coral orange | canary yellow | lime green | azure blue | violet purple | rose pink | rusty brown | slate gray | ivory white | crimson | amber | lemon | olive | teal | violet | rose | umber | pewter | onyx | ivory | turquoise | cerise | lilac | cyan | gold | platinum | khaki | ebony | azure | scarlet | apricot | lime | fern | cobalt | orchid | coral | sienna | slate | jet | pearl | aquamarine | lavender | mint | bronze | silver | jade | garnet | ruby | topaz | sapphire | indigo | mauve | amber | copper | burgundy | ivory | quartz | tangerine";
const traceryColors = [
    "ruby red", "fiery orange", "sun-kissed yellow", "verdant green", "sapphire blue", 
    "regal purple", "blushing pink", "earthy brown", "misty gray", "raven black", 
    "pure white", "oceanic turquoise", "royal magenta", "dreamy lavender", "mystic teal", 
    "radiant gold", "shimmering silver", "olive grove", "charcoal embers", "nightfall indigo", 
    "carmine red", "tangerine orange", "lemon yellow", "forest green", "electric blue", 
    "amethyst purple", "fuchsia pink", "sienna brown", "smoky gray", "midnight black", 
    "pearl white", "aqua turquoise", "orchid magenta", "lilac lavender", "mint teal", 
    "metallic gold", "sparkling silver", "moss olive", "graphite charcoal", "deep indigo", 
    "maroon red", "coral orange", "canary yellow", "lime green", "azure blue", 
    "violet purple", "rose pink", "rusty brown", "slate gray", "ivory white", 
    "crimson", "amber", "lemon", "olive", "teal", 
    "violet", "rose", "umber", "pewter", "onyx", 
    "ivory", "turquoise", "cerise", "lilac", "cyan", 
    "gold", "platinum", "khaki", "ebony", "azure", 
    "scarlet", "apricot", "lime", "fern", "cobalt", 
    "orchid", "coral", "sienna", "slate", "jet", 
    "pearl", "aquamarine", "lavender", "mint", "bronze", 
    "silver", "jade", "garnet", "ruby", "topaz", 
    "sapphire", "indigo", "mauve", "amber", "copper", 
    "burgundy", "ivory", "quartz", "tangerine"
  ];
  

$(document).ready(function () {
    const randomSeed = getURLParameter();
    // console.log("Random Seed:", randomSeed); // This will log the seed from the URL


    RiTa.randomSeed(randomSeed);
    myRng = new Math.seedrandom(randomSeed);
    // console.log(myRng()); // Example usage of the seeded RNG


    let elemDiv = document.createElement('div');
    elemDiv.className = "headline left";
    elemDiv.innerHTML = "To be endless.";
    document.getElementById("lines").appendChild(elemDiv);

    for (let i = 0; i < 30; i++) {
        addLine();
    }
});

$(window).on('beforeunload', function () {
    $(window).scrollTop(0);
});

function getURLParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const seed = urlParams.keys().next().value;
    return seed;
}



// idk a better way to get "an" in the right places

function replaceA(s) {
    if (!s.includes(" a ")) {
        return s;
    }
    words = s.split(" ");
    for (let i = 0; i < words.length - 1; i++) {
        if (words[i] == "a") {
            let w = words[i + 1];
            let phone = RiTa.phones(w).split("-")[0];
            if (vowels.includes(phone)) {
                words[i] = "an";
            }
        }
    }
    return words.join(" ");
}

function addLine() {
    let line = replaceA(generateToBe());
    let elemDiv = document.createElement('div');
    elemDiv.className = "line";
    if (myRng() < 0.3) {
        elemDiv.classList.add("center");
    } else {
        elemDiv.classList.add("left");
    }
    if (myRng() < 0.05) {
        elemDiv.classList.add("italic")
    }
    elemDiv.innerHTML = line;
    document.getElementById("lines").appendChild(elemDiv);
}

// generate single line

function generateToBeRiTa() {
    let rules = {
        "start": "To be $phrase.",
        "phrase": "$noun-phrase [3]| $verb-phrase | $adj-phrase | $sentences [10]",
        "sentences": "$s1 | $s2 | $s3 | $s4 | $my1 [2] | $my2 [2] | $my3 [2] | $my4 [2]",
        "s1": "$det $adj2 $nn2 for $per-pro",
        "s2": "a $adj $nn for $vbg",
        "s3": "a $nn $prep $per-pro",
        "s4": "a $adj-comp $nn $prep $poss-pro $nn2",
        "my1": "loved for my $adj $nn | loved in $adv $vbg ways",
        "my2": "$adj and $adj2",
        "my3": "$adv $my2",
        "my4": "$color, to be a $color.nr() $nn",
        "noun-phrase": "$nns | $nn | $noun-single [10]",
        "noun-single": "a $nn | a good $nn [5]| a $adj $nn [3] | $prep $nn | $adj $prep $poss-pro $nn | one last $adj $nn [10]",
        "verb-phrase": "$verbs | $adv $verbs [10]",
        "verbs": "$vbg | $vbn",
        "color": colors,
        "adj-phrase": "$adj | $adj-comp | the $adj-sup | $adv $adj | $color $adj",
        "adv": RiTa.randomWord({ pos: "rb" }),
        "vb": RiTa.randomWord({ pos: "vb" }),
        "vbg": RiTa.randomWord({ pos: "vbg" }),
        "vbn": RiTa.randomWord({ pos: "vbn" }),
        "vbz": RiTa.randomWord({ pos: "vbz" }),
        "nns": RiTa.randomWord({ pos: "nns" }),
        "nn": RiTa.randomWord({ pos: "nn" }),
        "nn2": RiTa.randomWord({ pos: "nn" }),
        "adj": RiTa.randomWord({ pos: "jj" }),
        "adj2": RiTa.randomWord({ pos: "jj" }),
        "adj3": RiTa.randomWord({ pos: "jj" }),
        "adj-comp": RiTa.randomWord({ pos: "jjr" }),
        "adj-sup": RiTa.randomWord({ pos: "jjs" }),
        "prep": RiTa.randomWord({ pos: "in" }),
        "dt": RiTa.randomWord({ pos: "dt" }),
        "poss-pro": "my | your | our | their | his | her | its",
        "per-pro": "you | them | her | him | us",
        "det": "another | some | that | this | every | each"
    };

    let rg = RiTa.grammar(rules);
    let result = rg.expand();
    return result;
}

function generateToBe() {
    let rules = {

          "origin": ["To be #phrase#."],
          "phrase": [
            "#noun-phrase#",
            "#noun-phrase#",
            "#noun-phrase#",
            "#verb-phrase#",
            "#adj-phrase#",
            "#sentences#",
            "#sentences#",
            "#sentences#",
            "#sentences#",
            "#sentences#",
            "#sentences#",
            "#sentences#",
            "#sentences#",
            "#sentences#",
            "#sentences#",
          ],
          "sentences": [
            "#s1#",
            "#s2#",
            "#s3#",
            "#s4#",
            "#my1#",
            "#my1#",
            "#my2#",
            "#my2#",
            "#my3#",
            "#my3#",
            "#my4#",
            "#my4#"
          ],
          "s1": ["#det# #adj2# #nn2# for #per-pro#"],
          "s2": ["a #adj# #nn# for #vbg#"],
          "s3": ["a #nn# #prep# #per-pro#"],
          "s4": ["a #adj-comp# #nn# #prep# #poss-pro# #nn2#"],
          "my1": ["loved for my #adj# #nn#", "loved in #adv# #vbg# ways"],
          "my2": ["#adj# and #adj2#"],
          "my3": ["#adv# #my2#"],
          "my4": ["#color#, to be a #color# #nn#"],
          "noun-phrase": [
            "#nns#",
            "#nn#",
            "#noun-single#",
            "#noun-single#",
            "#noun-single#",
            "#noun-single#",
            "#noun-single#",
            "#noun-single#",
            "#noun-single#",
            "#noun-single#",
            "#noun-single#",
            "#noun-single#",
            "#noun-single#"
          ],
          "noun-single": [
            "a #nn#",
            "a good #nn#",
            "a good #nn#",
            "a good #nn#",
            "a good #nn#",
            "a good #nn#",
            "a #adj# #nn#",
            "a #adj# #nn#",
            "a #adj# #nn#",
            "#prep# #nn#",
            "#adj# #prep# #poss-pro# #nn#",
            "one last #adj# #nn#",
            "one last #adj# #nn#",
            "one last #adj# #nn#",
            "one last #adj# #nn#",
            "one last #adj# #nn#",
            "one last #adj# #nn#",
            "one last #adj# #nn#",
            "one last #adj# #nn#",
            "one last #adj# #nn#",
            "one last #adj# #nn#",
            "one last #adj# #nn#"
          ],
          "verb-phrase": [
            "#verbs#",
            "#adv# #verbs#",
            "#adv# #verbs#",
            "#adv# #verbs#",
            "#adv# #verbs#",
            "#adv# #verbs#",
            "#adv# #verbs#",
            "#adv# #verbs#",
            "#adv# #verbs#",
            "#adv# #verbs#",
            "#adv# #verbs#",
            "#adv# #verbs#"
          ],
          "verbs": [
            "#vbg#",
            "#vbn#"
          ],
          "color": traceryColors,
          "adj-phrase": [
            "#adj#",
            "#adj-comp#",
            "the #adj-sup#",
            "#adv# #adj#",
            "#color# #adj#"
          ],
          "adv": [RiTa.randomWord({ pos: "rb" })],
        "vb": [RiTa.randomWord({ pos: "vb" })],
        "vbg": [RiTa.randomWord({ pos: "vbg" })],
        "vbn": [RiTa.randomWord({ pos: "vbn" })],
        "vbz": [RiTa.randomWord({ pos: "vbz" })],
        "nns": [RiTa.randomWord({ pos: "nns" })],
        "nn": [RiTa.randomWord({ pos: "nn" })],
        "nn2": [RiTa.randomWord({ pos: "nn" })],
        "adj": [RiTa.randomWord({ pos: "jj" })],
        "adj2": [RiTa.randomWord({ pos: "jj" })],
        "adj3": [RiTa.randomWord({ pos: "jj" })],
        "adj-comp": [RiTa.randomWord({ pos: "jjr" })],
        "adj-sup": [RiTa.randomWord({ pos: "jjs" })],
        "prep": [RiTa.randomWord({ pos: "in" })],
        "dt": [RiTa.randomWord({ pos: "dt" })],
          "poss-pro": ["my", "your", "our", "their", "his", "her", "its"],
          "per-pro": ["you", "them", "her", "him", "us"],
          "det": ["another", "some", "that", "this", "every", "each"]
        
      };

    grammar = tracery.createGrammar(rules);
    tracery.setRng(myRng);
    grammar.addModifiers(tracery.baseEngModifiers);
    
    let result = grammar.flatten("#origin#");
    return result;
}


// infinite scroll

function handleInfiniteScroll() {
    const endOfPage = window.innerHeight + window.pageYOffset + offset >= document.body.offsetHeight;
    if (endOfPage) {
        addLine();
    }
};

window.addEventListener("scroll", handleInfiniteScroll);

// about modal

var modal = document.getElementById("modal");
var btn = document.getElementById("menu");
var span = document.getElementsByClassName("close")[0];


btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
