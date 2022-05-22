k='00000000'
j='RGBA'
I='11'
H='10'
i=print
a='.txt'
F='01'
E='00'
Z=ord
T=range
S=format
R=open
J=''
C=len
B=int
A=str
from PIL import Image as X
D=[E,F,H,I,E,F,H,I,E,F]
def Q(binary):
	A=binary
	if C(A)<8:A=Q('0'+A)
	return A
def G(binary):
	A=binary
	if B(A[0])==0:A=G(A[1:C(A)])
	return A
def Y(b):return[b[0]+b[1],b[2]+b[3],b[4]+b[5],b[6]+b[7]]
def K(filename,imgname,ext,file_length):
	m='\x00';b=filename;W='b';U=file_length;H=ext;E=' ';V=A(U)
	if H==a:K=R(b,'r').read();K+=m;c=E.join((S(Z(A),W)for A in K)).split(E)
	else:K=R(b,'rb').read();c=E.join((S(B(A),W)for A in K)).split(E)
	H+=m;V=E.join((S(Z(A),W)for A in V)).split(E);H=E.join((S(Z(A),W)for A in H)).split(E);d=V+H;L=X.open(imgname).convert(j);l=L.load();e,f=L.size;F=0;g=0
	if e*f>U:
		for I in T(e):
			if g==1:break
			for h in T(f):
				if F>=U and I!=0:g=1;break
				if I==0 and F<C(d):G=Y(Q(d[F]))
				else:G=Y(Q(c[F]))
				M,N,O,P=L.getpixel((I,h));M=A(M)[0:C(A(M))-1]+A(D.index(A(G[0])));N=A(N)[0:C(A(N))-1]+A(D.index(A(G[1])));O=A(O)[0:C(A(O))-1]+A(D.index(A(G[2])));P=A(P)[0:C(A(P))-1]+A(D.index(A(G[3])));l[(I,h)]=B(M),B(N),B(O),B(P);F+=1
				if I==0 and J.join(G)==k:F=0;break
		i('hide complete');L.save('uploads/hidden.png',format='png')
def L(imgname):
	U='.';E=[];M=0;I=0;N=0;F=J;K=X.open(imgname).convert(j);Z=K.load();V,W=K.size
	for G in T(V):
		if M==1:break
		for Y in T(W):
			if G!=0 and I>=N:M=1;break
			O,P,Q,S=K.getpixel((G,Y));L=D[B(A(O)[C(A(O))-1])]+D[B(A(P)[C(A(P))-1])]+D[B(A(Q)[C(A(Q))-1])]+D[B(A(S)[C(A(S))-1])];I+=1
			if L==k and G==0:N=B(J.join(E).split(U)[0]);F=U+J.join(E).split(U)[1];E=[];I=0;break
			if G==0 or F==a:E.append(chr(B(L,2)))
			else:E.append(B(L,2))
	i('unhide complete')
	if F==a:H=R('uploads/decoded.txt','w',encoding="utf-8");H.write(J.join(E))
	else:H=R('uploads/decoded'+F,'wb+');H.write(bytearray(E))
	H.close();return F