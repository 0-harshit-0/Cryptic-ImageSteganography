m='00000000'
l='RGBA'
k='r'
f='11'
e='10'
c='\x00'
Q='01'
P='00'
b=ord
L=None
V='.txt'
U=print
T=range
S=format
I='.'
K=open
H=''
C=int
B=len
A=str
from PIL import Image as Z
import argparse as W,os
D=[P,Q,e,f,P,Q,e,f,P,Q]
def R(binary):
	A=binary
	if B(A)<8:A=R('0'+A)
	return A
def X(binary):
	A=binary
	if C(A[0])==0:A=X(A[1:B(A)])
	return A
def a(b):return[b[0]+b[1],b[2]+b[3],b[4]+b[5],b[6]+b[7]]
def Y(filename,imgname,ext,file_length):
	d=filename;Y='b';W=file_length;I=ext;E=' ';X=A(W)
	if I==V:L=K(d,k).read();L+=c;e=E.join((S(b(A),Y)for A in L)).split(E)
	else:L=K(d,'rb').read();e=E.join((S(C(A),Y)for A in L)).split(E)
	I+=c;X=E.join((S(b(A),Y)for A in X)).split(E);I=E.join((S(b(A),Y)for A in I)).split(E);f=X+I;M=Z.open(imgname).convert(l);n=M.load();g,h=M.size;F=0;i=0
	if g*h>W:
		for J in T(g):
			if i==1:break
			for j in T(h):
				if F>=W and J!=0:i=1;break
				if J==0 and F<B(f):G=a(R(f[F]))
				else:G=a(R(e[F]))
				N,O,P,Q=M.getpixel((J,j));N=A(N)[0:B(A(N))-1]+A(D.index(A(G[0])));O=A(O)[0:B(A(O))-1]+A(D.index(A(G[1])));P=A(P)[0:B(A(P))-1]+A(D.index(A(G[2])));Q=A(Q)[0:B(A(Q))-1]+A(D.index(A(G[3])));n[(J,j)]=C(N),C(O),C(P),C(Q);F+=1
				if J==0 and H.join(G)==m:F=0;break
		U('hide complete');M.save('encoded/hidden.png',format='png')
def d(imgname):
	E=[];O=0;L=0;P=0;F=H;M=Z.open(imgname).convert(l);b=M.load();X,Y=M.size
	for G in T(X):
		if O==1:break
		for a in T(Y):
			if G!=0 and L>=P:O=1;break
			Q,R,S,W=M.getpixel((G,a));N=D[C(A(Q)[B(A(Q))-1])]+D[C(A(R)[B(A(R))-1])]+D[C(A(S)[B(A(S))-1])]+D[C(A(W)[B(A(W))-1])];L+=1
			if N==m and G==0:P=C(H.join(E).split(I)[0]);F=I+H.join(E).split(I)[1];E=[];L=0;break
			if G==0 or F==V:E.append(chr(C(N,2)))
			else:E.append(C(N,2))
	U('unhide complete')
	if F==V:J=K('decoded/decoded.txt','w');J.write(H.join(E))
	else:J=K('decoded/decoded'+F,'wb+');J.write(bytearray(E))
	J.close();return F
J=W.ArgumentParser(description='Cryptic - image steganography ')
J.add_argument('-e','--encode',type=A,nargs=2,metavar='file_names image_file',default=L,help='opens and hides files into image.')
J.add_argument('-d','--decode',type=A,nargs=1,metavar='image_file',default=L,help='opens and unhides files from image.')
E=J.parse_args()
if E.encode!=L and B(E.encode)==2:
	F=E.encode[0];G=E.encode[1]
	if os.path.exists(F)and os.path.exists(G):
		U('hide');M=I+H.join(F.split(I)[1])
		if M==V:N=K(F,k);O=B(N.read()+c);N.close()
		else:O=os.path.getsize(F)
		Y(F,G,M,O)
if E.decode!=L and B(E.decode)==1:
	G=E.decode[0]
	if os.path.exists(G):U('unhide');d(G)

