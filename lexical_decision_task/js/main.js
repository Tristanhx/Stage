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

let echteWoorden =
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
ode`;

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
yab
gpl
wlc
mwg
xrc
xpm
nsf
wrl
ntc
tpp
aeu
yph
nph
pga
tdv
nlv
xsf
eue
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
nfa
ngu
rfu
nni
dba
tsi
tva
pma
tfa
gae
tbi
nwi
nci
pty
brt
tse
pga
gge
tki
wlo
tca
dli
nva
ett
kao
pty
lfu
wso
mra
gpi
ibr
ybo
ppy
mge
gma
yha
nna
nhe
gfo
ogr
psi
yda
tpi
yba
wbo
sga
wlo
nfa
tpu
yhs
tca
wja
esx
yps
rba
kao
dga
wro
ksa
wbo
gpi
ypa
drt
tfe
glo
wso
tlo
tje
bje
pli
eeb
yrc
pjt
mra
phi
tnu
pca
yla
wco
ylf
yda
dsq
tcu
tjp
nni
ybu
edr
ysa
gma
thu
rra
pca
lfu
nni
trd
`;
const fakeWords = `yek
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
gel
woc
meg
yrc
xim
nuf
wal
nac
typ
aes
yah
neh
ega
tav
nav
xof
eud
pil
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
nep
tra
yap
deb
sig
naf
nug
ruf
nni
dab
tis
tav
pam
taf
ega
tib
niw
nac
pyt
bor
tes
pag
gge
tik
wol
tac
dil
nav
eit
kao
pyt
ulf
wos
mra
gip
bir
yob
pyp
meg
gam
yah
nan
neh
gof
oge
pis
yad
tip
yab
wob
sog
wol
naf
tup
yhs
tac
waj
esu
yps
rab
kao
dag
wor
ksa
wob
gip
yap
der
teb
gol
wos
tol
tej
boj
pil
eeb
yrc
pjt
mra
pih
tun
pac
yal
woc
ylf
yad
dea
tuc
tjp
nni
yub
eud
yas
gam
tuh
ria
puc
ulf
nin
yrd
`;

let fourLetterWords = `fire
drag
rack
bang
take
roll
snow
tube
knot
area
wood
foot
fund
beer
rule
load
hear
fort
bond
boom
crop
king
sink
wait
desk
arch
able
flex
knit
host
drop
wall
post
calf
rung
echo
note
term
play
spot
tent
call
slot
duke
beat
soar
mess
dive
mass
read`;

let fourLetterFakeWords = `fims
fise
blag
plag
rans
rall
babs
baws
tate
toke
rull
soll
whow
frow
rube
tusp
wrot
smot
etua
eteo
dood
woud
foat
fout
fuke
fule
bour
beem
russ
ruke
lood
leed
heam
heas
foth
folt
bote
bont
boam
beem
grop
crip
kint
kive
sist
sive
warf
walm
delk
wesk
alks
arge
asca
asco
slex
flef
knat
smit
hust
homs
blop
swop
wams
wans
pist
ponk
colf
carf
tung
rong
urto
uneo
nole
noss
tefs
tesk
scay
plab
flot
sput
tunt
tews
coll
cags
flot
crot
dule
duss
buit
beap
seir
soam
mech
memp
wive
dave
mamp
maff`;
let targetWordList;
let nonTargetWordList;
let wordList;
const gfx = new Graphics();
const io = new IO();
const lex = new Lex();

function startGame(){
    console.log('Start!');
    document.getElementById("myForm").style.display = "none";
    gameArea.start();
    lex.overlayToggle(true, "first");
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}