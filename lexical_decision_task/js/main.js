let pseudoWords = `cas
eet
lut
nen
jut
bok
doo
arf
vid
ord
mun
ank
dat
gar
mip
ent
lin
dux
fof
ven
vot
alk
hin
hab
rea
pid
han
lar
fup
mox
cre
ger
cok
ler
bab
bep
rop
etd
tib
vit
wew
bam
rew
wam
mub
gon
alk
sut
kek
rin
nat
`;

//TODO: make dutch pseudowords

let realWords =
    `car
eat
put
nun
jet
boy
die
act
kid
oil
run
ash
fat
gas
tip
end
lip
due
fox
van
vat
age
hen
hay
sea
pit
can
law
fun
mix
cry
gem
cow
leg
bay
bed
top
egg
rib
kit
few
bar
row
war
rub
gun
ask
cut
key
tin
nit
bur`;

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