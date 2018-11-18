let pseudoWords = `eep
oos
bap
byk
cik
dap
daf
aad
auk
see
fak
vas
got
hep
hai
oet
oep
jes
kem
kie
lyk
lod
mas
woe
jek
nin
ien
oby
tan
pom
qui
hat
loe
fap
ste
mas
wof
vik
fla
nak
wos
zok
zoe
sle
flo
oel
dig
dre
gro
arf
irp
`;

//TODO: make dutch pseudowords

let realWords =
    `aap
aas
ban
bek
cru
cis
dak
dar
eed
eik
fee
fik
gas
gok
hap
hoi
iet
iep
jas
juf
kam
koe
lak
log
mak
moe
nek
non
oen
opa
pan
por
qua
rat
roe
sap
sta
tas
tof
ufo
urn
vak
vla
wak
wol
zak
zie
sla
vlo
iel
ode
`;

const fillers = `yvk
tdc
ksa
nrg
rpw
wwr
rbb
wtf
tkk
bqr
gge
plt
dwb
ykb
gpl
wlc
mwg
xrc
xpm
nsf
wrl
ntc
tpp
ghj
yph
nph
pga
tdv
nlv
xsf
hkj
pll
dne
pwt
sqg
tsf
hsa
ntr
llo
dqk
tca
eqd
ybb
trj
nbn
tpe
rce
npe
tsa
ypa
dbe
sgi
`;
const fakeWords = `  
yek
tuc
ksa
nug
riw
wor
rab
wef
txk
bir
gge
pyt
deb
yab
ged
woc
meg
yrc
xim
nuf
waj
nac
typ
aes
yah
neh
egt
tav
nav
xof
eud
pih
dne
pyt
syg
taf
hsa
nur
lio
dik
tca
eid
yob
tej
nyn
tup
rac
neh
tra
yap
deb
sig
`;
let targetWordList;
let nonTargetWordList;
let wordList;
const gfx = new Graphics();
const io = new IO();
const lex = new Lex();

function startGame(){
    //console.log('Start!');
    document.getElementById("myForm").style.display = "none";
    gameArea.start();
    lex.overlayToggle(true, "first");
    lex.setupNextLevel(lex.level);
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}