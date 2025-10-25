let onlineViewersMessages = [
  "🟢 {VIEWERS} online previewing strings decorations with our tool!"
]
let modified = false;
let currentShowcaseModeId = "text";
let showcaseMode = 0;
let maxShowcaseMode = 3;
function toggleMode(element,event) {
    //console.log(element);
    showcaseMode++;
    if(showcaseMode > maxShowcaseMode) {
        showcaseMode = 0;
    }
    updateMode();
}
const inputContent = document.getElementById("input-content");
let modesMapId = new Map();
let modesMapName = new Map();
let showcaseModesAvailable = {
    "text": {
        mode: "0",
        modeName: "text",
        display: "Text 📄",
        displayName: "Text Showcase 📄",
        elementId: "text-mode-option",
        showcaseElementId: "showcase-text-mode-option",
        default: [
          `&6&l&nTest your messages! Easily and fast!`,
          ` `,
          `&#ff1c51&lCreate some cool gradients on:`,
          `&#c00bd6h&#c20cd2t&#c50dcft&#c70dcbp&#c90ec8s&#cb0fc4:&#ce10c1/&#d011bd/&#d212baa&#d412b6l&#d713b3o&#d914afn&#db15acs&#dd16a8o&#e016a5a&#e217a1l&#e4189ei&#e6199aa&#e91a97g&#eb1a93a&#ed1b90.&#ef1c8cc&#f21d89o&#f41e85m&#f61f82/&#f81f7eh&#fb207be&#fd2177x`,
          ``,
          `&#00ffbf&lTest your announcements or ranks!`,
          `&8&k|&8Stone&k| &7&k|&7Iron&k| &6&k||&6Gold&k|| &1&k||&1Lapiz&k||`,
          `&b&k||&bDiamond&k|| &a&k||&aEmerald&k|| &5&k||&5Obsidian&k||`,
          // `&8&k|&8Stone&k|`,
          // `&7&k|&7Iron&k|`,
          // `&6&k||&6Gold&k||`,
          // `&1&k||&1Lapiz&k||`,
          // `&b&k||&bDiamond&k||`,
          // `&a&k||&aEmerald&k||`,
          // `&5&k||&5Obsidian&k||`,
        ],

    },
    "lore": {
        mode: "1",
        modeName: "lore",
        display: "Lore 💎",
        displayName: "Lore Showcase 💎",
        elementId: "lore-mode-option",
        showcaseElementId: "showcase-lore-mode-option",
        ad: "lobby-1",
        default: [
          `&d&l⚞ Boots of the Zephyr's Whisper ⚟&r`,
          `{{CUSTOM_IMAGE}}`,
          ``,
          `&7Woven from condensed winds and imbued`,
          `&7with the spirit of swift currents, these`,
          `&7boots grant unparalleled agility, allowing`,
          `&7their wearer to dance on air.`,
          ``,
          `&f ❤ Health:`,
          `&7  ◇ Additional Health: &c+3.0`,
          ``,
          `&f ⛛ Enchantment Slots (&a2&7/&a3&7):`,
          `&7  ◈ &aFeather Falling X&r`,
          `&7  ◈ &aDepth Strider III&r`,
          `&7  ◇ Empty`,
          ``,
          `&f ⇶ Movement:`,
          `&7  ⮞ Speed: &9+40%`,
          `&7  ⮞ Jump Height: &9+2 Blocks`,
          `&7  ⮞ Fall Damage: &9Immune`,
          `&7  ⮞ Evasion Chance: &9+20%`,
          ``,
          `&f ✫ Special Abilities:`,
          `&7  ➔ &eWind Dash: &7Double-tap forward to`,
          `&7     dash swiftly, becoming invulnerable`,
          `&7     for a moment (5s Cooldown).`,
          `&7  ➔ &eAir Walk: &7Briefly walk on air after`,
          `&7     a jump (3s duration, 15s Cooldown). `,
          ``,
          `&4         ㊉ Empty Rune Slot`,
          `&4         ㊉ Empty Rune Slot`,
          ``,
          `&e      Found by &bAlonsoAliaga &eon`,
          `&6       The Sky-Touched Peaks`,
        ],
    },
    "motd": {
        mode: "2",
        modeName: "motd",
        display: "MOTD 💻",
        displayName: "MOTD Showcase 💻",
        elementId: "motd-mode-option",
        showcaseElementId: "showcase-motd-mode-option",
        default: [
          "           &fAlonsoCraft Network &a[1.8-1.21]",
          "    &a&lPillar Of Fortune &7- &9&lSkywars &7- &6&lLucky Islands"
        ],
    },
    "chat": {
        mode: "3",
        modeName: "chat",
        display: "Chat 👤",
        displayName: "Chat Showcase 👤",
        elementId: "chat-mode-option",
        showcaseElementId: "showcase-chat-mode-option",
        ad: "lobby-2",
        default: [
          `&#ff1c51&lHello! Anyone know a site to create colored text?`,
          `&eSure! https://alonsoaliaga.com/minecraft-color`,
          `&dThat site is awesome! Don't forget to share it!`,
          `&9Agree! Best tool for colored text ever!`,
          `&#44ff00What about https://alonsoaliaga.com/hex site?`,
          `&bOMG! That one is even better and useful!`,
        ],
    },
    "sign": {
        mode: "4",
        modeName: "sign",
        display: "Sign 🪧",
        displayName: "Sign Showcase 🪧",
        elementId: "sign-mode-option",
        showcaseElementId: "showcase-sign-mode-option",
        ad: "lobby-3",
        default: [
          `&4[Shop]`,
          `&7Click to purchase`,
          `&c&lAlonsoTagsPro`,
          `&a$9.99`,
        ],

    },
}
for(let id of Object.keys(showcaseModesAvailable)) {
    let data = showcaseModesAvailable[id];
    modesMapId.set(data.mode,data)
    modesMapName.set(id,data)
}
const legacyColors = {
    '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
    '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
    '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
    'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF'
};
let customColors2 = [
]
let customColors = [
  ["&lime","&#80ff00"],
  ["&cute","&#ff0051"],
  ["&purple","&#8c00ff"],
]
async function isCustomAllowed() {
  if(customColors.length == 0) return false;
  try{
    if(!await checkUnlock("unlock-features","New Features","unlock-features-div"))
      return false;
  }catch(e){
    return false;
  }
  return true;
}
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function openIconUploadBox(event) {
  //console.log(event);
  let imagePreview = document.getElementById("motd-icon");
  // Create a new input element
  const uploadInput = document.createElement('input');
  uploadInput.type = 'file';

  // Add event listener to handle file selection
  uploadInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    // Handle the file upload or further processing here
    
    // Create a FileReader object
    const reader = new FileReader();

    // Set up a load event listener on the FileReader
    reader.addEventListener('load', function() {
      // Update the image source with the uploaded image
      imagePreview.src = reader.result;
    });

    // Read the uploaded file as a data URL
    reader.readAsDataURL(file);
  });

  // Append the input element to the image container
  document.body.appendChild(uploadInput);

  // Trigger a click event on the input element
  uploadInput.click();
  
  document.body.removeChild(uploadInput);
}
function fillLines(array, linesAmount) {
  if(array.length != 2) {
    for(let i = 0; array.length < linesAmount; i++) {
      array.push("⠀")
    }
  }
  return array;
}
function fixLines(line, maxChars) {
  const classicCode = /&[0-9a-fk-or]/i;
  const fullCodeRegex = /(&#[0-9a-f]{6}|#[0-9a-f]{6}|&[0-9a-fk-or])/gi;
  const colorCodeRegex = /^(&?#(?:[0-9a-f]{6})|&[0-9a-f])/i;

  function getActiveFormats(code) {
    let formats = '';
    code.match(fullCodeRegex)?.forEach(match => {
      if (/&r/i.test(match)) {
        formats = '';
      } else if (colorCodeRegex.test(match)) {
        formats = match; // color resets styles
      } else if (!formats.includes(match)) {
        formats += match;
      }
    });
    return formats;
  }

  function splitLine(str, max) {
    const result = [];
    let rawLen = 0;
    let current = '';
    let activeFormat = '';
    let i = 0;

    while (i < str.length) {
      // Detect hex or classic format
      const hex6 = str.slice(i, i + 8);
      const hex6short = str.slice(i, i + 7);
      const classic = str.slice(i, i + 2);

      if (/^&#[0-9a-f]{6}/i.test(hex6)) {
        current += hex6;
        activeFormat = getActiveFormats(current);
        i += 8;
        continue;
      }
      if (/^#[0-9a-f]{6}/i.test(hex6short)) {
        current += hex6short;
        activeFormat = getActiveFormats(current);
        i += 7;
        continue;
      }
      if (/^&[0-9a-fk-or]/i.test(classic)) {
        current += classic;
        activeFormat = getActiveFormats(current);
        i += 2;
        continue;
      }

      current += str[i];
      rawLen++;
      i++;

      if (rawLen >= max) {
        result.push(current);
        current = activeFormat;
        rawLen = 0;
      }
    }

    if (rawLen > 0 || current !== '') {
      result.push(current);
    }

    return result;
  }
  return splitLine(line, maxChars);
}
let rankTypes = {
  "hypixel": [
    "&c[ADMIN] &c",
    "&9[HELPER] &9",
    "&6[MVP&5++&6] &6",
    "&b[MVP&e+&b] &b",
    "&a[VIP&c+&a] &a",
    "&6[YT] &6",
    "&7",
  ],
  "cubecraft": [
    "&5&k||&5Obsidian&k|| &5",
    "&b&k||&bDiamond&k|| &b",
    "&a&k||&aEmerald&k|| &a",
    "&6&k||&6Gold&k|| &6",
    "&7&k||&7Iron&k|| &7",
    "&8&k||&8Stone&k|| &8",
  ],
  "regular": [
    "&4&lOWNER &4",
    "&f&lMOD &f",
    "&3&lBUILDER &3",
    "&a&lENDER&6&l+ &a",
    "&5&lENDER &5",
    "&6&lDRAGON &6",
    "&9&lWITHER &9",
    "&8",
  ],
  "image": [
    "{{CUSTOM_RANK}} &4",
    "{{CUSTOM_RANK}} &e",
    "&8",
  ]
}
let ranks = [
  "&6&lYouShouldn'tBeReadingThis"
]
let usernames = [
  "AlonsoAliaga",
  "VegettaGaymer",
  "TheWillyrex",
  "Dream",
  "byStaXx",
  "alexby11",
  "Luzugames",
  "SpreenDMC",
  "MumboJumbo",
  "MrBeast",
  "JustOneSoup"
]
let userMap = new Map();
let customRankToReplace = [];
function getRandomSender() {
  let randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
  if (!userMap.has(randomUsername)) {
    let randomRank = ranks[Math.floor(Math.random() * ranks.length)]
    if(randomRank.includes("{{CUSTOM_RANK}}")) {
      let newCustomRankIndex = customRankToReplace.length + 1;
      let newCustomRankIndexFull = `{{CUSTOM_RANK_${newCustomRankIndex}}}`;
      customRankToReplace.push([newCustomRankIndex,rankImages[Math.floor(Math.random() * rankImages.length)]])
      randomRank = randomRank.replace(/\{\{CUSTOM_RANK}}/g,newCustomRankIndexFull)
    }
    userMap.set(randomUsername, randomRank);
    //console.log(`[New] Random user: ${randomUsername} = ${userMap.get(randomUsername)}`)
  }else{
    //console.log(`[Old] Random user: ${randomUsername} = ${userMap.get(randomUsername)}`)
  }
  return `${userMap.get(randomUsername)}${randomUsername}`
}
const _legacyFn = Symbol('legacyFn');
const internal = {
  [_legacyFn]: async function (content) {
    let data = showcaseModesAvailable[currentShowcaseModeId];
    if(!data) return;
    let element = document.getElementById(data.showcaseElementId);
    if(element) {
      content = content.map(line=>line.replace(/\s/g," "))
      if(content.length == 1 && content[0] == "") content[0] = " ";
      if(await isCustomAllowed()) {
        content = content.map(line=>{
          for(let [r,c] of customColors) {
            const regex = new RegExp(escapeRegex(r), 'gi');
            line = line.replace(regex,c);
          }
          return line;
        });
      }
      let rankType = Object.keys(rankTypes)[Math.floor(Math.random() * Object.keys(rankTypes).length)];
      ranks = rankTypes[rankType]
      userMap.clear();
      customRankToReplace = [];
      //console.log(`Selecting new random users! ========`)
      //console.log(`Selected rank type: ${rankType}`)
      //console.log(content)
      if(currentShowcaseModeId == "motd") {
        let name = "&6Your Server Name";
        let finalArray = [];
        for(let line of content) {
          if(line.startsWith("name=")) name = line.slice(5);
          else finalArray.push(line);
        }
        //console.log(content);
        //console.log(finalArray);
        let copy = fillLines([].concat(finalArray.slice(0,2).map(w=>w == "" ? " " : w)),2);
        //console.log(`⚠️ Current content array length: ${copy.length}`)
        //console.log(copy)
        document.getElementById("motd-saved-name").innerHTML = formatMinecraftText([name])
        element.innerHTML = formatMinecraftText(copy)
      }else if(currentShowcaseModeId == "sign") {
        let copy = fillLines([].concat(content.slice(0,4).map(w=>w == "" ? " " : w)),4);
        //console.log(`⚠️ Current content array length: ${copy.length}`)
        //console.log(copy)
        element.innerHTML = formatMinecraftText(copy)
      }else if(currentShowcaseModeId == "chat") {
        let finalChat = [];
        /*
        for(let line of content) {
          finalChat.push(`&4&lOWNER &cAlonsoAliaga&f: ` + line);
        }
        element.innerHTML = formatMinecraftText(finalChat);
        */
        for(let line of content) {
          let parts = fixLines(`${getRandomSender()}&7: ${line}`,80);
          //let i = 0;
          for(let part of parts) {
            let chatEntry = `<div class="chat-entry">${formatMinecraftText([part])}</div>`
            finalChat.push(chatEntry)
            /*
            let user = formatMinecraftText([`&4&lOWNER &cAlonsoAliaga&f: `]);
            if(i == 0) {
              let chatEntry = `<div class="chat-entry">${user}${formatMinecraftText([part])}</div>`
              finalChat.push(chatEntry)
            }else{
              let chatEntry = `<div class="chat-entry">${formatMinecraftText([part])}</div>`
              finalChat.push(chatEntry)
            }
            i++;
            */
          }
        }
        element.innerHTML = finalChat.join("");
        //let copy = fillLines([].concat(content.slice(0,4).map(w=>w == "" ? " " : w)),4);
        //console.log(`⚠️ Current content array length: ${copy.length}`)
        //console.log(copy)
      }else{
        element.innerHTML = formatMinecraftText(content)
      }
    }
    function formatMinecraftText(lines) {
        const escapeHtml = str => str.replace(/[&<>"]/g, c => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'
        }[c]));
      
        const darkenHex = (hex, factor = 0.25) => {
            let r = parseInt(hex.substr(1, 2), 16);
            let g = parseInt(hex.substr(3, 2), 16);
            let b = parseInt(hex.substr(5, 2), 16);
            r = Math.floor(r * factor);
            g = Math.floor(g * factor);
            b = Math.floor(b * factor);
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        };
      
        const applyStyles = (text, s) => {
            if (!text) return ''; // Ensure we don't create empty spans for empty text
            const safeText = escapeHtml(text);
            const shadow = darkenHex(s.color);
            let classes = [];
            let style = `white-space: pre-wrap;font-family: MinecraftiaRegular; color:${s.color}; filter: drop-shadow(2.3px 2px 0px ${shadow});`;
        
            if (s.bold) {
              style += 'font-weight:bold;';
            }
            if (s.italic) {
              style += 'font-style:italic;';
            }
            if (s.underlined && s.strikethrough) {
              classes.push("fake-underline");
              classes.push("fake-strike");
            } else if (s.underlined) {
              classes.push("fake-underline");
            } else if (s.strikethrough) {
              classes.push("fake-strike");
            }
          
            if (s.obfuscated) {
              classes.unshift("mc-obfuscated");
              return `<span class="${classes.join(" ")}" data-length="${safeText.length}" style="${style}">${safeText}</span>`;
            }
            return `<span ${classes.length == 0 ? `` : `class="${classes.join(" ")}" `}style="${style}">${safeText}</span>`;
        };
      
        return lines.map(line => {
            if(false && line.includes("{{CUSTOM_IMAGE}}")) {
              return `<img height="35px" style="image-rendering: pixelated; cursor: pointer;" id="custom-rank-image" class="customRankImageClass" onclick="(()=>{
                  window.open('https://alonsoaliaga.com/rank-textures','_blank');
                    return false;
                  })();" onmousemove="const b=document.getElementById('hover-box');b.style.left=event.clientX+10+'px';b.style.top=event.clientY+10+'px';b.style.display='block'"
                  onmouseleave="document.getElementById('hover-box').style.display='none'" src='${loreImages[currentImageIndex]}'></img>`
            }
            //console.log(`Adding ${line}`);
            let html = '', buffer = '', i = 0;
            let styles = {
                color: typeof currentShowcaseModeId !== 'undefined' && currentShowcaseModeId == "lore" ? '#AA00AA' : "#FFFFFF",
                bold: false, italic: typeof currentShowcaseModeId !== 'undefined' && currentShowcaseModeId == "lore",
                underlined: false, strikethrough: false,
                obfuscated: false
            };
          
            const flush = () => {
                if (buffer.length > 0) { // Only flush if there's actual text in the buffer
                    html += applyStyles(buffer, styles);
                    buffer = '';
                }
            };
          
            while (i < line.length) {
                if (line[i] === '&' || line[i] === '#') {
                    let isAmp = line[i] === '&';
                    let start = i + 1; // Start checking after '&' or '#'
                    let potentialCode = line[start]?.toLowerCase();
                
                    // Check for HEX color code: &#RRGGBB
                    if (isAmp && line[start] === '#') {
                        const hex = line.slice(start + 1, start + 7);
                        if (/^[0-9a-fA-F]{6}$/.test(hex)) {
                            flush();
                            styles = { color: `#${hex}`, bold: false, italic: false, underlined: false, strikethrough: false, obfuscated: false };
                            i = start + 7; // Move past &#RRGGBB
                            continue;
                        }
                    }
                  
                    // Check for legacy color or format code: &X
                    if (legacyColors[potentialCode] || ['l', 'o', 'n', 'm', 'k', 'r'].includes(potentialCode)) {
                        flush();
                        if (legacyColors[potentialCode]) {
                            styles = { color: legacyColors[potentialCode], bold: false, italic: false, underlined: false, strikethrough: false, obfuscated: false };
                        } else {
                            switch (potentialCode) {
                                case 'l': styles.bold = true; break;
                                case 'o': styles.italic = true; break;
                                case 'n': styles.underlined = true; break;
                                case 'm': styles.strikethrough = true; break;
                                case 'k': styles.obfuscated = true; break;
                                case 'r': styles = { color: '#FFFFFF', bold: false, italic: false, underlined: false, strikethrough: false, obfuscated: false }; break;
                            }
                        }
                        i = start + 1; // Move past &X or #X
                        continue;
                    }
                }
                // If it's not a valid format code, or it's a regular character, add to buffer
                buffer += line[i++];
            }
            flush();
            if(currentShowcaseModeId == "chat") {
              for(let [k,v] of customRankToReplace) {
                let regex = new RegExp(`\{\{CUSTOM_RANK_${k}}}`, "g");
                html = html.replace(regex,`<img height="17px" style="image-rendering: pixelated;position: relative;top: 1px; cursor: pointer;" id="custom-rank-image" class="" onclick="(()=>{
                  window.open('https://alonsoaliaga.com/rank-textures','_blank');
                    return false;
                  })();" onmousemove="const b=document.getElementById('hover-box');b.style.left=event.clientX+10+'px';b.style.top=event.clientY+10+'px';b.style.display='block'"
                  onmouseleave="document.getElementById('hover-box').style.display='none'" src='${v}'></img>`);
              }
              return html.replace(/\{\{CUSTOM_RANK}}/g, `<img height="17px" style="image-rendering: pixelated;position: relative;top: 1px; cursor: pointer;" id="custom-rank-image" class="" onclick="(()=>{
                  window.open('https://alonsoaliaga.com/rank-textures','_blank');
                    return false;
                  })();" onmousemove="const b=document.getElementById('hover-box');b.style.left=event.clientX+10+'px';b.style.top=event.clientY+10+'px';b.style.display='block'"
                  onmouseleave="document.getElementById('hover-box').style.display='none'" src='${rankImages[Math.floor(Math.random() * rankImages.length)]}'></img>`);
            }else if(currentShowcaseModeId == "lore") {
              return html.replace(/\{\{CUSTOM_IMAGE}}/g,`<img height="35px" style="image-rendering: pixelated; cursor: pointer;" id="custom-rank-image" class="customRankImageClass" onclick="(()=>{
                  window.open('https://alonsoaliaga.com/rank-textures','_blank');
                    return false;
                  })();" onmousemove="const b=document.getElementById('hover-box');b.style.left=event.clientX+10+'px';b.style.top=event.clientY+10+'px';b.style.display='block'"
                  onmouseleave="document.getElementById('hover-box').style.display='none'" src='${loreImages[currentImageIndex]}'></img>`);
            }
            return html;
        }).join('<br>');
    }
  }
};
async function loadShowcaseModes() {
    let modesDiv = document.getElementById("showcase-div");
    for(let [id,data] of modesMapName.entries()) {
        //console.log(id,data)
        let featureId = id;
        let featureName = data.displayName;
        let elementId = data.elementId;
        let element = document.createElement("div");
        element.classList.add("render-mode-card");
        element.id = elementId;
        element.style.margin = "2px";
        // element.style.width = "150px";
        // element.style.height = "200px";
        element.innerHTML = `<div style="display:inline-block;min-width:fit-content;margin-top:2px;font-size:15px;font-weight:bold;" class="render-label">${featureName.replace(/\s+/g,"<br>")}</div>`;
        modesDiv.appendChild(element);
        if(data.lobby) checkMode(featureId,data);
        else element.onclick = function(){selectMode(id)}
    }
}
let loreImages = [
  `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAJCAIAAAAQIoO2AAAAAXNSR0IArs4c6QAAAbtJREFUOI3NlEFrE1EYRc+dFETo0t/gHyhFCCqoqGmhQSIWUVEQNGgRTY0YsU1BI3ajFUSkuhBE3LiRWilaFIu4kOIfcOtW3FgQ0c51MZ2Xl8ZSBRd+i3ln7hy+x/vgjZoUjYxMEj07IF0jj1/TNfIMUsR6fdLOvEfQZGtKIaWwTJJBSiElSSksR9zt/K3/hz1NYZYWExR/cnGMbbZtf+VKg53Oq07Jdo1B22cZCvkIlcBVDgZ+x/xbXi+wcIzjITxMNfAwZwJXGA1cphH4Nj9KNBMAJAAua0evxy+xq6HdwGfdJPsMQI3yOe0DPupRlp3WMHktau69XgppRQc4qpOBD2kktDqgGrCf8xVdAB7oS+ZM69tdfReAEgPYGAADxjkQAW5rIWtXvwe82uGh773Qh1hztLqrT9UbT3lDlidamUr7oELZ2ZTPKziRJjprUXO53zGzve6LNUWroqBM476WhjQW8iQ+yjW/WdLV67ya9DywyaN1SnUN3vDzT5qeYuaWnwKbfYSu6vfAFu8hn3eYWeDHvhM2euKpVUOcYfKEe5+5FWapCYrjbP/drflnd63b93rOLC39t/+zX5e4n6XJcE9sAAAAAElFTkSuQmCC`,
  `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAKCAYAAAAXfRggAAAAAXNSR0IArs4c6QAAAs5JREFUSInlVk1IVFEU/u7bSIsQigoGwcYSh8i0/BkzSEoLw8IhqckWpVAJIRbNOL+2KtRRXIVEtahdWbQpdVG0aFHQj6gUMVCbQMYaJsUgaQLfaTHOnffuve85i3adyzD3nO9895x77/cejwFAeryOoDNAZ6DVf+6vACANpAPQNUCHKY9WGECGfCVfEbfwzXWydVV5+fDt8sS4zCv6NMjYn0k35RpRHMCaG7PfiPVc5llx/uUBQgcojwPk8/Skm9LjddTXXkSi/X6wn6JtxdyPepx8/ut2E0WOlnA/cmQ7n4cPl/L5z/5jFD5Yxv1Qg0uqQ0S0eMVLi5dP0UJPOy10n6ZgTbmU86PjLKXOdFBgV6WEJY9foKSni3rLqiXsW1M3+Z21yrpERD5HvRSb2xGiOVeYNIbMABhEK/C+VEQzluOpsJytDz+xQc1R489ooapKAMCGu/cwNDuD2Oy0xN/0+BaG4+8xFH8nYVue37Csa2XZ/WmEzACIg1e9xXxOFgvkeCrMbP0v4kp0KXwCS8GTWOr18g5IwR+cmgEALHR2mOKp9nMI7KxS9pBsuYje0lru+521+H7gEvxb63hsfq8P826/iZeoCCJRHuL70+yUYGf5KsgOLRx4hMLYQ1N0LQWJPeRTx7gys8kAAMdsDI4PgzkFQaGEa2NflSWjHif6PCUAgHXnn+H60y8AgOXRZlOecbVIU5mwiqwgkSMqyErFG+/fwdDHKSW2eWIUw5/fCquoNe9z1MPn2CfUzORqsHkHpccapBOPtpagr3Ubjy3fbJa4Ri/S6EKk0aVEswoqHB4z3a/YSYw/Yp0IVuxGsGKP1GuqrQsBVzUCrhoJSx7qUSooW2kk8RojiVcCsnoq6Qk3rf0d839+B0Fn0Apa3jBmeANIWmLMdKK5m1gdzHwvIp8xc77xJkWeXAcSz9ynXNeqTwgalfpU8IriA+wvCfGSBX5IBA4AAAAASUVORK5CYII=`,
  `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAGCAIAAADlgeFeAAAAAXNSR0IArs4c6QAAAZ5JREFUOI3Fks1qFFEQhb8KWdQqt99CwY24CmgWESEzMaF9gTEEZpEE6QfQbjPjjOtIlDEQVJLo3oJJJgHBhWCCMxp/ZvDvXbwubnf7QwLuvKtzTp1bxT23ZI1vAHjBgy/AHwp4OUX5t+qJ/h+AnOQfBzlgvRmvU5xVu9GMH5S0YSuNuBNw05ZW442yNLC+IMAum7fjzSAe2+suj7P4UWlr22IaP/mNLqTxVknvWu1WvFPSkXXHwHtQx6F9PbQvR/YZvDqObNSwFXVUWW7Ysjre2HtAHX1717e3AxsAPn8c6rhjdXV4vMer49hetWxRHaH/B3vZtgV1zFP7aC/adl0dn+wgjBtab2h7Q9v1MAYioBHV5IwACIhGVJJz95KORggAf4HCiRRMI+ao39yuX04uClL4c6BRHoNGCBLuBDGmNtjeB4xnl5KrgoyXOQHX0rMIvZZXx/PWKHx2j85G+hBhPju/10InmMsuhAHdVv9XThPMZpOzTIbw1FHJpipM4XM6k03P+GkkRJuLgLFzP32KcIVq0GWN76fv8v/Z/Z8bwOF2D+Iq9wAAAABJRU5ErkJggg==`,
  ``,
  ``,
  ``,
  ``,
  ``,
  ``,
]
let rankImages = [
  `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAAICAYAAABDPleNAAAAAXNSR0IArs4c6QAAAlRJREFUSImVVU1LG1EUPe9rIGaj2IWCWQmVhmTTj03Aha5cSeIIs9C1mBDUVUuhpNjSpdAW2/4A3QgOjO7FbUkrCGnAWFzVVVtwEwOlibeLzExm5s3U9sDw3rnv3XvnzXnDYQBQF4I4Y+BCgDMGzjk45xCcg7mjH1MKwjDAlerPA1wq1Y8bBoRSuFEKXSnR9caEeU8p9KQEkxIQAsydBzm8mMtvABAwGIli+aPFRYaPjFFdCFrhnDw00mmqGIbPv46O0trQEEXxI5ejx2NjPu/MzNCzyUmf17JZLcfDRqHgz5ubm1SenfV5ZW5O23+2s0NV04ytVbEsLXZi2/TZtqm+v08cMaAIf9vp4M31tbbvTqMRl/5voGiXeFTn5wEAU8vL/1X+/sICyFVTAgCLbMi323iXkPwtk8HrdhtbV1e3Nnqey+HX0hJeNJt4dXoKAPheraKrFMCiXeOxfXgIAGjt7oZyzh3Hv5ZBlC0LH/b2AACMMTAicLjKrXCOVSm1Jq2RkXDgbwoQhdYpwr1ecfEkhJQM5NwtFjFVLGq3zjvgiW37Sg6uK2NYlRJlpfzQ2fCwpnLm8jJRxdTxMV5eXAxKxuxh7hcOqpKt1fD+6Cj+lAmKnzsOWo6j9ShbFgDggWn2lQwdMuZf9L7cWiqF9XRaa/Qzn8eT8XE8nZjQ1qhU0usFlNwoFLA+Pa2tf9naCvHtgwPAu64BeEreK5W0+oPX7yvJAOCTEBS1Cu1hDEKIgXW4NsGVgkywFFIKv6VEL2ofMdbSC9hGrJVE4nSLdXj8oWmyP3bwevO8eOcBAAAAAElFTkSuQmCC`,
  `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAICAYAAABpjqYiAAAAAXNSR0IArs4c6QAAAVVJREFUOI2lVMtKw0AUPVOwSVofbc3vdCUIrkSK9GG1+CXOn0irtroQVAQpuLJ+TquIYKKb4yJNZvKYJuiBMHPOfc3cCVcAQGVEAoAQAEWwAgBE8OVxiGDReZgvj/+13qIpBCpDsjoi1w7OmMT6hCy3lF4+TPuQpNVW+uYduXVPWl2l1R5Ju5eOrU9Ju6/0xjPpnCjuDNIx2y+kOyPdV7IEAEQ2Pjtmmwkf+4A/kfDHMtK8sYR3JVO+b7txvtjJrzdvLjcESlCvGMFqqUJJW+TTTh8mhD+J2/Qc9SfA6ZtjvWG2rXKa0MXy8Mnb0rDXyfdNdhG7K2NrVv7/gljR+Z9bQ+dNz6DB6kjUHuK+etj7HuBdGro7ML/I13niTKbOh9i4NttW/TZIJLV6EvZR2r8xjXPnWMJZcQEAcGcqvwCA6kUwKjNHk0kvONJQcGTqvEj+eVOIX+Iw35S6+8DXAAAAAElFTkSuQmCC`,
  `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAICAYAAACPp21mAAAAAXNSR0IArs4c6QAAAadJREFUOI2VlL9L43AYxj9v/QGmpTcoCCqcnFc5pbqJClZvFCl429EuJ7g5OJ0O7k46KbiJm3+HiIMiuIgiSkFFcdDFHmeKTXxvMEmTS5PiO+R5vm+e95tvnoRHAMrk1cSmgo3Jm4M2Fd4wY3gNg/3X1maspIGdMuqilTKwHYzTuVjtzQhVZrVMXpf4qlH1k26Pz9Dp8RztAV2WdOQeo1Oz2pXJhvpfVtf00/SMtzYKhcD9lpsrTTzda0JRAOdavzSCf6Turi+4vzwN9UsrvyOf5W80C4IAy/RzK9OsccWmlgDYkxwmNuKb8/N9fQJgQfqoYJMlzQ/p4rzpL5fWMwDfByawUgbiGxyeX+Th7ITHw4PQwV92dwFIHx9ipQxIGiCQUN491RivGjm6paXAfD296n+9Bp+mPDKGczBQSIjjkcQMRTk6KR0e39Gbhnq3Trc3eDwKuwmQLBY9/jI4/L6B6ygf+Ef9laODcWmP1bu8p/cb3f1DIW3f6npg3VYo0jb3K7iBOi/8h7yagaipRVR0HPk1QV5tbapFkBtHdaIphBGa188Z+QfKM15lMQf3QQAAAABJRU5ErkJggg==`,
  `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAICAYAAACVm43oAAAAAXNSR0IArs4c6QAAASVJREFUOI21VDFOAzEQnNnNg5IG6OiokOgAHQqQAvEmKoogEQlCARQgUVACTeBB9tDEaO/OQJqMZMme3Z1bj+0jANy6ixJIghII/D/WmD8CiBt3zd11564DUl08mKkJ/JOZns00DtxxmL+SOg3rCdDTlKSzCr8g9QnoC5ABgADMcsYsZ3Sxm1JrrTBq2M4Z0G/Rtk4Xw5x/tC1aWHA/GKAxqwrW8ru4DI3FvDczvJvhw6zFn5OtfAIwST0HClfDVMJOSlB05Q+HYmQrZ2zm3NO/WNYvyOAY2XNgLyVcV44VAK6W/DQ2E3Y8YdvLmmPlmwXFsVF4GFY63DfDYeX4Ht3RkDgKsXGYv3RqTshWczXHNpZ3qYbSDwFg7q6Vnvk6fyehbgjwG8O+50gm1DuvAAAAAElFTkSuQmCC`,
  `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAICAYAAAC/K3xHAAAAAXNSR0IArs4c6QAAAV9JREFUOI2VVGtKA0EM/iK9T4Wuu64gPYq2un1AoRb3GCosCtXW10VasIK10oo9Ufwx+5iZzK41MMw3yZeZZBJCAIDZJYOQCiPHxOlu6XWbwS/xF1jnOfzLsM3bnxIwixnzmHESsktweljgxYixuGC0NF07cPud+VK3GjDOD9z8yCvwps/Y9BjfPUa3Ibk/HbW2Ee+pLLXfqRA+vgFePsHPy534wt+/3ZVpbMJaf8iNNbMvlNBbLFsmc64InpZDtz4KwNOV1Hd88OQrPRgW5/vU98DjdXpQRlUBNlPl5hW4eS1+gNqhsSuyBsMEHCbi67LgaTUw9Vnw1j15PHZzCA6nFbAzzSpgSysEvY8ssgY/hunZvDCrAAd3oEdf3msJN8aFL3mF/n4tHq7J1FQFctprqFuqHz5KCr+n4M9AjRb6h9C2m8ei0pjHXDkOy3DZOETJCK0cm2Vj1uGf4fqEfgFV3BGbT36bmQAAAABJRU5ErkJggg==`,
  ``,
  ``,
  ``,
  ``,
]
loreImages = loreImages.filter(u=>u.length != 0);
rankImages = rankImages.filter(u=>u.length != 0);
let currentImageIndex = 0;
let currentUsed = false;
setInterval(()=>{
  let elements = [...document.querySelectorAll(".customRankImageClass")];
  if(elements.length == 0) return;
  //let element = document.getElementById("custom-rank-image");
  //if(!element) return;
  currentImageIndex++;
  if(currentImageIndex >= loreImages.length) {
    currentImageIndex = 0;
  }
  elements.forEach(element=>element.src = loreImages[currentImageIndex]);
  //element.src = loreImages[currentImageIndex];
  currentUsed = true;
},1000);
let texting = crypto.randomUUID();
let checking = crypto.randomUUID();
async function selectMode(id) {
    texting = crypto.randomUUID();
    let data = showcaseModesAvailable[id];
    if(data) {
      if(data.ad) {
        if(adBlockEnabled) {
          console.log(`Converting to Legacy..`)
          return;
        }
      }
      if(!data.lobby || await checkUnlock(id)) {
        currentShowcaseModeId = id;
        checking = texting;
        updateModeShowcaseDiv(texting);
      }else{
        console.log(`Converting to Legacy..`)
      }
    }else{
      console.log(`Converting to Legacy..?`)
    }
}
async function updateModeShowcaseDiv(checking) {
  if(texting != checking) {
    console.log(`Converting to Legacy..`)
    return;
  }
  let data = showcaseModesAvailable[currentShowcaseModeId];
  if(typeof data == "undefined") return;
  //console.log(`Updating mode div ${currentShowcaseModeId}`)
  //console.log(`⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️`)
  //console.log(`Selected showcase mode: ${currentShowcaseModeId}`)
  for(let element of [...document.querySelectorAll(".showcase-class")]) {
      if(element.dataset.mode == currentShowcaseModeId) {
          element.style.display = "inline-block";
          if(!modified) {
            inputContent.value = data.default.join("\r\n");
          }
          let content = inputContent.value.split(/\r?\n/g);
          //console.log(content)
          internal[_legacyFn](content)
          //console.log(`[✅] Showing: ${element.dataset.mode}`)
      }else{
          element.style.display = "none";
          let toHideData = showcaseModesAvailable[element.dataset.mode];
          if(toHideData) {
            let nElement = document.getElementById(toHideData.showcaseElementId);
            if(nElement) {
              //console.log(`[⛏️] Setting to Loading: ${nElement.id}`)
              nElement.innerHTML = "Loading?"
              //nElement.style.display = "none";
            }
          }
          //console.log(`[❌] Hiding: ${element.dataset.mode}`)
      }
  }
}

async function checkMode(id,value) {
    let isUnlocked = await checkUnlock(id,value.displayName,value.elementId);
    let element = document.getElementById(value.elementId);
    if(isUnlocked) {
        element.onclick = function(){selectMode(id)}
    }else{
        element.classList.add('adlockedcard');
        const ov = document.createElement('div');
        ov.className = 'overlay';
        ov.innerHTML = `<span style="color: #ff8484;">${value.displayName}</span><br><img src="https://raw.githubusercontent.com/AlonsoAliaga/mc-renders/main/assets/images/lock-icon.png"><br><span>Unlock this showcase mode!</span>`;
        ov.onclick = function() {
          let opened = window.open(`./supportus.html`,`_blank`);
          if(opened) {
            setTimeout(()=>{
              let data = {featureId:id,featureName:value.displayName,uniqueId:unlockFeaturesUniqueID,featureElementId:element.id}
              opened.postMessage(data,"*");
            },1000);
          }
        }
        element.append(ov);
    }
}
function updateMode() {
    let unknown = `Unknown (${showcaseMode}) ❌`;
    let element = document.getElementById("showcase-mode-div");
    if(!element) return;
    if(modesMapId.has(`${showcaseMode}`)) {
        let data = modesMapId.get(`${showcaseMode}`);
        element.textContent = data.display;
    }else{
        element.textContent = unknown;
    }
}
function toggleBox(element,event) {
    let targetBoxId = element.dataset.targetBox;
    if(typeof targetBoxId == "undefined") return;
    let targetBox = document.getElementById(targetBoxId);
    if(targetBox) {
        //console.log(`Box with id ${targetBoxId} exists!`)
        let option = element.checked;
        if(option) {
            targetBox.classList.add("expanded");
        }else{
            targetBox.classList.remove("expanded");
        }
    }else{
        //console.log(`Box with id ${targetBoxId} doesn't exist!`)
    }
}
function toggleDarkmode() {
    if (document.getElementById('darkmode').checked == true) {
      document.body.classList.add('dark');
      for(let d of [...document.querySelectorAll(".lightbuttonboxes")]) {
        if(d) {
          d.classList.remove("lightbuttonboxes");
          d.classList.add("darkbuttonboxes");
        }
      }
      let success = document.getElementById('success_message');
      if(success) {
        success.classList.remove("successlight");
        success.classList.add("successdark");
      }
    } else {
      document.body.classList.remove('dark');
      for(let d of [...document.querySelectorAll(".darkbuttonboxes")]) {
        if(d) {
          d.classList.remove("darkbuttonboxes");
          d.classList.add("lightbuttonboxes");
        }
      }
      let success = document.getElementById('success_message');
      if(success) {
        success.classList.remove("successdark");
        success.classList.add("successlight");
      }
    }
}
let divisor = "minecraft-color";
let times = 0;
function loadCounter() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NvdW50ZXI/c2l0ZT08c2l0ZT4ma2V5PTxrZXk+")
  .replace(/<site>/g,divisor).replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("visitor-counter");
 //console.log(link)
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
       if(isNaN(result))
         document.getElementById("counter-amount").innerHTML = "Click to return!";
       else document.getElementById("counter-amount").innerHTML = `Visits: ${result}`;
     },
     error: function (e) {
       times++;
       document.getElementById("counter-amount").innerHTML = "Click to return!";
       if(times <= 1) {
        setTimeout(()=>{
          loadCounter();
        },1000*10);
       }
     }
   });
 }
}
function getRandomViewersMessage() {
  return onlineViewersMessages[Math.floor(Math.random() * onlineViewersMessages.length)]
}
function loadChecking() {
 let href = window.location.href;
 if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) return;
 let link = atob("aHR0cHM6Ly9hbG9uc29hcGkuZGlzY2xvdWQuYXBwL2NoZWNraW5nP3NpdGU9PHNpdGU+JmtleT08a2V5Pg==")
  .replace(/<site>/g,divisor).replace(/<key>/g,"KEY-A");
 let counter = document.getElementById("online-counter");
 if(counter) {
   $.ajax({
     url: link,
     type: "GET", /* or type:"GET" or type:"PUT" */
     dataType: "json",
     data: {
     },
     success: function (result) {
        //console.log(`Total fails: ${counter.dataset.failed}`)
        counter.dataset.failed = "0";
        counter.style.display = "flex";
        /*
        if(true){
          currentViewers = -999;
          //counter.textContent = `🟢 ${result} user${result==1?``:`s`} online using our Minecraft Profile Picture Generator!`;
          counter.textContent = getRandomViewersMessage().replace(/{VIEWERS}/g,"999");
          counter.style.backgroundColor = "green";
        }else 
        */
        if(isNaN(result)) {
          counter.textContent = `🟡 You shouldn't be reading this. Report it on https://alonsoaliaga.com/discord`;
          counter.style.backgroundColor = "yellow";
          currentViewers = -1;
        }else{
          currentViewers = +result;
          //counter.textContent = `🟢 ${result} user${result==1?``:`s`} online using our Minecraft Profile Picture Generator!`;
          counter.textContent = getRandomViewersMessage().replace(/{VIEWERS}/g,result);
          counter.style.backgroundColor = "green";
        }
     },
     error: function (e) {
      //console.log(`Total fails: ${counter.dataset.failed}`)
      if(counter.style.display != "none") {
        let currentFails = +counter.dataset.failed;
        if(currentFails >= 1){
          counter.style.display = "none"
        }else{
          counter.textContent = `🔴 Check your internet connection!`;
          counter.style.backgroundColor = "#7c0000";
          counter.dataset.failed = `${currentFails + 1}`
        }
      }
     }
   });
 }
}
function checkSite(window) {
  let search = window.location.search;
  /*
  if(typeof search !== "undefined" && search.length > 0) {
    let parts = atob(search.slice(1)).split("&");
    for(let part of parts) {
      let [k,v] = part.split("=");
      k = btoa(k);
      if(k == "dXNlcm5hbWU=") {
        if(v.match(/[a-z0-9_]/gi)) {
          setTimeout(()=>{
            usernameInput.value = v;
            processUsername();
          },500);
        }
      }
    }
  }
  */
  setTimeout(()=>{
    let href = window.location.href;
    if(!href.includes(atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw=="))) {
      try{document.title = `Page stolen from https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}`;}catch(e){}
      window.location = `https://${atob("YWxvbnNvYWxpYWdhLmdpdGh1Yi5pbw==")}/minecraft-color/`}
  });
  fetch('https://raw.githubusercontent.com/AlonsoAliaga/AlonsoAliagaAPI/refs/heads/main/api/tools/tools-list.json')
    .then(res => res.json())
    .then(content => {
      let toolsData = content;
      let toolsArray = []
      for(let toolData of toolsData) {
        let clazz = typeof toolData.clazz == "undefined" ? "" : ` class="${toolData.clazz}"`;
        let style = typeof toolData.style == "undefined" ? "" : ` style="${toolData.style}"`;
        toolsArray.push(`<span>💠</span> <span${clazz}${style}><a title="${toolData.description}" id="tool-priority-${toolData.priority}" href="${toolData.link}">${toolData.name}</a></span>`);
      }
      document.getElementById("tools-for-you").innerHTML = toolsArray.join(`<br>`);
    });
}
window.addEventListener("DOMContentLoaded",()=>{
  loadCounter();
  checkSite(window);
  setTimeout(()=>{
    loadChecking();
    setInterval(()=>{
      loadChecking();
    },10000)
  },2500)
});
setInterval(()=>{
  document.getElementById("random-players").textContent = `${getRandomSecureInt(1,20)}/20`;
},2500);
function getRandomSecureInt(min, max) {
    const range = max - min + 1;
    if (range <= 0) {
        throw new Error("Invalid range: max must be greater than or equal to min.");
    }
    const randomBytes = new Uint32Array(1);
    let randomNumber;
    // Loop until a number within the desired range is obtained
    do {
        window.crypto.getRandomValues(randomBytes);
        // Use modulo operator to get a value within the range,
        // but loop to avoid bias if the range doesn't evenly divide the max value of Uint32Array.
        randomNumber = randomBytes[0] % range;
    } while (randomNumber > range - 1); // Ensures no bias from the modulo operation
    return randomNumber + min;
}
function copyTextToClipboard(text) {
  let textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.bottom= 0;
  textArea.style.left= 0;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  alertMessage([`<b>💎 Successfully Copied! 💎</b>`,`<span style="font-size: small;">Thanks for using our tool!</span>`], isHTML);
  document.body.removeChild(textArea);
}
let alertTimeout;
function alertMessage(value, isHTML = false) {
  if(alertTimeout) {
    clearTimeout(alertTimeout);
    var sb = document.getElementById("snackbar");
    sb.className = sb.className.replace("show", "");
  }
  var sb = document.getElementById("snackbar");
  if(isHTML) {
    sb.innerHTML = value.join("<br>");
  }else{
    sb.textContent = value.join("\n");
  }
  sb.className = "show";
  alertTimeout = setTimeout(()=>{ sb.className = sb.className.replace("show", ""); }, 5000);
}
function lockElementWithMessage(element,className,message,iconUrl='https://raw.githubusercontent.com/AlonsoAliaga/mc-renders/main/assets/images/lock-icon.png') {
  if(element) {
    element.classList.add(className);
    const ov = document.createElement('div');
    ov.className = 'overlay';
    ov.innerHTML = `<img src="${iconUrl}"><span>${message}</span>`;
    element.append(ov);
  }
}
const textarea = document.getElementById('input-content');
const lineHeight = 15; // Approximate line height in px (adjust if needed)
const minRows = 3;
const maxRows = 6;
textarea.addEventListener('input', () => {
  // Reset height to recalculate scrollHeight correctly
  textarea.rows = minRows;
  const lines = Math.floor(textarea.scrollHeight / lineHeight);
  textarea.rows = Math.min(Math.max(lines, minRows), maxRows);
});
loadShowcaseModes();
selectMode(currentShowcaseModeId);

inputContent.addEventListener("keyup",function(){
  modified = true;
  updateModeShowcaseDiv(texting);
});

function processAds() {
  lockElementWithMessage(document.getElementById("lore-mode-option"),"adlocked",`Disable AdBlock to access lore preview!`)
  lockElementWithMessage(document.getElementById("chat-mode-option"),"adlocked",`Disable AdBlock to access chat preview!`)
  lockElementWithMessage(document.getElementById("sign-mode-option"),"adlocked",`Disable AdBlock to access sign preview!`)
}

const obfuscationMap2 = {
  "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz": "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 [{}] ÁÂÃÄÅĀĂ Ą А ΒВÇ ĆĈĊČС ÈÉÊËĒĔĖĘĚΣЕ ҒĜĞĠĢǤĤĦΗНĶΚК ĹĻĽŁΜМÑŃŅŇΝНÒÓÔÕÖ ØŌŎŐ ΟОӨÞΡРŔŖŘЯ ŚŜŞŠЅŢŤŦΤТÙÚÛÜŪŬŮŰ ŲѴŴШΧХÝŸŶΥҮҰŹŻŽƵΖÆŒ".replace(/\s+/g,""), 
  "¿?": "¿? 0123456789 [{}] ÁÂÃÄÅĀĂ Ą А ΒВÇ ĆĈĊČС ÈÉÊËĒĔĖĘĚΣЕ ҒĜĞĠĢǤĤĦΗНĶΚК ĹĻĽŁΜМÑŃŅŇΝНÒÓÔÕÖ ØŌŎŐ ΟОӨÞΡРŔŖŘЯ ŚŜŞŠЅŢŤŦΤТÙÚÛÜŪŬŮŰ ŲѴŴШΧХÝŸŶΥҮҰŹŻŽƵΖÆŒ".replace(/\s+/g,""), 
  "!'¡|": "|¦;i',",
  "´`": "·`Ì''lílì'´'·",
};

const obfuscationMap = {
  "ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz": "ABCDEFGHJKLMNOPQRSTUVWXYZ 0123456789 [{}] AÄÅBCÇDEFGHIJKLMNOΩ PQRSTUÜVWXYZ".replace(/\s+/g,""), 
  "¿?": "¿? 0123456789 [{}] ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 [{}] AÄÅBCÇDEFGHIJKLMNOΩ PQRSTUÜVWXYZ".replace(/\s+/g,""), 
  "!'¡|": "|¦;i,",
  "´`": "·`Ì''lílì'´'·",
};
let pointerOn = false;
setInterval(() => {
  let pointer = document.getElementById("text-pointer");
  if(pointer) {
    pointer.innerHTML = pointerOn ? "<span style='font-size:14px'>⠀</span>" : "_";
    pointerOn = !pointerOn;
  }
},500);
setInterval(() => {
  const map = obfuscationMap;
  const fallbackChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const getReplacementChar = (char) => {
    for (const key of Object.keys(map)) {
      if (key.includes(char)) {
        const set = map[key];
        return set[Math.floor(Math.random() * set.length)];
      }
    }
    // Fallback to general chars
    return fallbackChars[Math.floor(Math.random() * fallbackChars.length)];
  };
  document.querySelectorAll('.mc-obfuscated').forEach(elem => {
    const original = elem.getAttribute('data-original') || elem.textContent;
    let result = '';
    for (let char of original) {
      if (char === ' ' || char === '⠀') {
        result += ' ';
      } else {
        result += getReplacementChar(char);
      }
    }
    elem.setAttribute('data-original', original); // Cache original for future refresh
    elem.textContent = result;
  });
}, 25);
function saveCustomColors() {
  let elements = [...document.querySelectorAll(".option-color")];
  customColors = [];
  for(let element of elements) {
    let field = element.querySelector(".symbol-field");
    let name = element.querySelector(".name-field");
    let color = element.querySelector(".colorpicker");
    //console.log(field.value,name.value,color.value);
    if(field && name && color) {
      let replacement = `${field.value}${name.value}`;
      let colorValue = color.value;
      //console.log(replacement,colorValue);
      if(replacement == "&name" || colorValue == "#ffffff" || colorValue == "&#ffffff") {
        //customColors.push([replacement,`&${colorValue}`])
      }else customColors.push([replacement,`&${colorValue}`]);
    }else console.log(`#1`);
  }
  //console.log(`Saving: `,customColors);
  localStorage.setItem(btoa("custom-colors"),JSON.stringify(customColors));
}
let minAmount = 12;
function loadCustomColors() {
  let data = localStorage.getItem(btoa("custom-colors"));
  if(data) {
    try{
      data = JSON.parse(data);
      customColors = data;
    }catch(e){
      console.log(`Error parsing custom colors. What are you doing..?`)
    }
  }
  //console.log(`Stored data: `,data)
  for(let i = 0; i < minAmount; i++) {
    if(customColors.length < minAmount) {
      customColors.push([`&name`,`&#ffffff`])
    }
  }
  //console.log(`Loading: `,customColors)
  let colors = []
  for(let [customCode,customColor] of customColors) {
    let code = customCode.slice(0,1);
    let word = customCode.slice(1);
    let color = customColor.replace(/&/g,"");
    colors.push(`<div class="option-color">
      <input onchange="updateSymbol(this);saveCustomColors();" style="border-radius: 5px !important" type="text" class="symbol symbol-field darktextboxes" value="${code}" />
      <input onchange="saveCustomColors();" style="border-radius: 5px !important" type="color" class="colorpicker darktextboxes" value="${color}" />
      <input onchange="updateName(this);saveCustomColors();" style="border-radius: 5px !important" type="text" class="text name-field darktextboxes" placeholder="color" value="${word}"/>
    </div>`)
  }
  let element = document.getElementById("custom-colors-filled");
  element.innerHTML = colors.join("");
}
loadCustomColors();
function updateSymbol(element) {
  //console.log(element);
  let newValue = element.value.toLowerCase();
  while(newValue.length != 0) {
    newValue = newValue.slice(0,1);
    newValue = newValue.replace(/[^&%$#]/gi,"")
    if(newValue == "") newValue = "&";
  }
  element.value = newValue;
}
function updateName(element) {
  //console.log(element);
  let newValue = element.value.toLowerCase();
  while(newValue.length <= 0) {
    newValue = newValue.replace(/[^[a-z0-9]/gi,"")
    if(newValue == "") newValue = "name";
  }
  element.value = newValue;
}