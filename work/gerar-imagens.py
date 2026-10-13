from PIL import Image, ImageDraw, ImageFilter
import os
R='/home/claude/pagina-vendas/pagina-de-vendas/work/raw/'
A='/home/claude/pagina-vendas/pagina-de-vendas/app/public/assets/'
COV='/home/claude/jornada-com-deus/public/covers/'
os.makedirs(A+'uso',exist_ok=True)
def page(slug,i):
    im=Image.open(R+f'{slug}-p{i:02d}.png').convert('RGB')
    return im.crop((66,125,1164,1610))   # só a folha, sem barras do leitor
def save(im,name,q=84,size=None):
    if size: im=im.resize(size,Image.LANCZOS)
    im.save(A+name,quality=q,method=6) if name.endswith('webp') else im.save(A+name)
def rr(im,r):
    m=Image.new('L',im.size,0);ImageDraw.Draw(m).rounded_rectangle((0,0,im.size[0]-1,im.size[1]-1),r,fill=255)
    o=im.convert('RGBA');o.putalpha(m);return o
def phone(screen,h):
    w=round(h*390/844);b=max(8,round(h*.014))
    s=screen.convert('RGB').resize((w,h),Image.LANCZOS)
    W,H=w+2*b,h+2*b;fr=Image.new('RGBA',(W,H),(0,0,0,0))
    ImageDraw.Draw(fr).rounded_rectangle((0,0,W-1,H-1),round(W*.15),fill=(14,12,10,255))
    fr.alpha_composite(rr(s,round(w*.12)),(b,b))
    ImageDraw.Draw(fr).rounded_rectangle((W*.38,b*.45,W*.62,b*1.25),4,fill=(50,44,38,255))
    return fr
def shadow(im,blur=22,off=(0,16),op=90):
    pad=blur*3;c=Image.new('RGBA',(im.width+2*pad,im.height+2*pad),(0,0,0,0))
    sh=Image.new('RGBA',im.size,(30,18,6,op));sh.putalpha(im.getchannel('A').point(lambda v:v*op//255))
    c.alpha_composite(sh,(pad+off[0],pad+off[1]));c=c.filter(ImageFilter.GaussianBlur(blur));c.alpha_composite(im,(pad,pad));return c
def cover(slug,h):
    im=Image.open(COV+slug+'.jpg').convert('RGB');w=round(h*im.width/im.height)
    return rr(im.resize((w,h),Image.LANCZOS),round(h*.012))
def put(canvas,im,cx,cy,rot=0):
    if rot: im=im.rotate(rot,expand=True,resample=Image.BICUBIC)
    canvas.alpha_composite(im,(round(cx-im.width/2),round(cy-im.height/2)))
# --- folhas reais do ebook (galeria, hero)
gal=[('procrastinacao',1,'introducao'),('procrastinacao',3,'raizes'),('procrastinacao',6,'pequenos-comecos'),('procrastinacao',7,'tempo'),('procrastinacao',11,'plano-21-dias'),('procrastinacao',13,'resumo')]
for s,i,n in gal: save(page(s,i),f'pagina-{n}.webp',size=(900,1218))
save(Image.open(COV+'procrastinacao.jpg').convert('RGB'),'capa-principal.webp',size=(600,900))
for k in ['procrastinacao','liberdade','financas']: save(Image.open(COV+k+'.jpg').convert('RGB'),f'capa-{k}.webp',size=(600,900))
# hero (camadas do CSS)
save(page('procrastinacao',3),'hero-pagina-esq.webp',size=(494,668));save(page('procrastinacao',6),'hero-pagina-meio.webp',size=(494,668));save(page('procrastinacao',11),'hero-pagina-dir.webp',size=(494,668))
save(Image.open(COV+'procrastinacao.jpg').convert('RGB'),'hero-capa.webp',size=(480,720))
save(Image.open(R+'app-momento.png').convert('RGB'),'hero-celular.webp',size=(390,844))
# bônus: capa + 2 páginas
save(Image.open(COV+'liberdade.jpg').convert('RGB'),'bonus-liberdade-capa.png',size=(600,900))
save(page('liberdade',6),'bonus-liberdade-p1.png',size=(600,812));save(page('liberdade',12),'bonus-liberdade-p2.png',size=(600,812))
save(Image.open(COV+'financas.jpg').convert('RGB'),'bonus-financas-capa.png',size=(600,900))
save(page('financas',6),'bonus-financas-p1.png',size=(600,812));save(page('financas',11),'bonus-financas-p2.png',size=(600,812))
rows=Image.open(R+'app-inicio-rows.png').convert('RGB');w,h=rows.size
save(rows.crop((0,round(h*.12),w,round(h*.12)+round(w/0.667))),'bonus-semanal-capa.png',size=(600,900))
# mid-pitch e receive (1536x1024, transparente)
def fan(c,cx,cy,hh,rot):
    for slug,dx,r,s in [('liberdade',-hh*.36,-9,.9),('financas',hh*.36,9,.9),('procrastinacao',0,0,1)]:
        put(c,shadow(cover(slug,round(hh*s))),cx+dx,cy+(0 if slug=='procrastinacao' else hh*.05),r)
c=Image.new('RGBA',(1536,1024),(0,0,0,0))
put(c,shadow(cover('liberdade',700)),380,520,-8);put(c,shadow(cover('financas',700)),1156,520,8)
put(c,shadow(cover('procrastinacao',820)),768,500,0)
put(c,shadow(phone(Image.open(R+'app-inicio.png'),600)),1180,700,5)
c.save(A+'mockup-pitch.png')
c=Image.new('RGBA',(1536,1024),(0,0,0,0))
put(c,shadow(cover('liberdade',560)),560,430,-8);put(c,shadow(cover('financas',560)),980,430,8);put(c,shadow(cover('procrastinacao',650)),768,420,0)
put(c,shadow(phone(Image.open(R+'app-momento.png'),520)),330,720,-4);put(c,shadow(phone(Image.open(R+'app-progresso.png'),520)),1206,720,4)
c.save(A+'mockup-colecao.png')
# cenas do app (3:4, 1086x1448)
def scene(shot,name,hexa,hexb):
    W,H=1086,1448;bg=Image.new('RGBA',(W,H));d=ImageDraw.Draw(bg)
    for y in range(H):
        t=y/H;d.line((0,y,W,y),fill=tuple(round(hexa[i]*(1-t)+hexb[i]*t) for i in range(3))+(255,))
    ph=shadow(phone(Image.open(R+shot),1180),blur=26,off=(0,22),op=120);bg.alpha_composite(ph,((W-ph.width)//2,(H-ph.height)//2+10))
    bg.convert('RGB').save(A+'uso/'+name+'.webp',quality=82,method=6)
for shot,n,a,b in [('app-inicio.png','inicio',(60,40,22),(24,15,8)),('app-momento.png','momento',(52,36,20),(22,14,7)),('app-busca.png','busca',(64,44,24),(26,17,9)),('app-progresso.png','progresso',(58,40,22),(24,15,8)),('app-devocional.png','devocional',(56,38,21),(23,15,8)),('app-oracao.png','oracao',(62,42,23),(25,16,8))]: scene(shot,n,a,b)
# avatares: sem pessoas; ícones de capas pequenas
for i,k in enumerate(['procrastinacao','liberdade','financas'],1):
    Image.open(COV+k+'.jpg').convert('RGB').resize((96,144)).crop((0,24,96,120)).save(A+f'avatar-{i}.webp',quality=85)
print('ok')
