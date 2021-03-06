 v a r   c o n f i g = ' ' ; 
 v a r   a p i _ s e c r e t = ' ' ; 
 v a r   a p i _ s e c r e t = ' ' ; 
 v a r   c o n f i g u r e d _ e m b e d c o d e s = { } ; 
 c o n f i g u r e d _ e m b e d c o d e s [ " a s s e t s " ] = [ ] ; 
 
 $ (   d o c u m e n t   ) . r e a d y ( f u n c t i o n ( )   { 
 
 	 
 	 d o c u m e n t . g e t E l e m e n t B y I d ( ' f i l e s ' ) . a d d E v e n t L i s t e n e r ( ' c h a n g e ' ,   h a n d l e F i l e S e l e c t ,   f a l s e ) ; 
 	 v a r   t i m e   =   M a t h . f l o o r ( D a t e . n o w ( )   /   1 0 0 0 )   + 3 0 0 ; 
     
 } ) ; 	 
 
 f u n c t i o n   u p d a t e A P I K e y s ( ) { 
     a p i _ k e y =   $ ( " # o o y a l a - a p i - k e y " ) . v a l ( ) . t r i m ( ) ; 
     a p i _ s e c r e t =   $ ( " # o o y a l a - a p i - s e c r e t " ) . v a l ( ) . t r i m ( ) ; 
 } 
 
 f u n c t i o n   I m p l e m e n t C h a n g e ( e m b e d c o d e ) { 
 
     c o n s o l e . l o g ( ' c l i c k e d   B u t t o n : ' + e m b e d c o d e ) ; 
     u p d a t e A P I K e y s ( ) ; 
     v a r   o   =   s e a r c h E m b e d C o d e ( e m b e d c o d e , c o n f i g . a s s e t s ) ; 
     v a r   p   =   {   s t r e a m _ u r l s :   o . s t r e a m _ u r l s } ; 
     v a r   t i m e   =   M a t h . f l o o r ( D a t e . n o w ( )   /   1 0 0 0 )   + 1 0 ; 
     u p d a t e _ e m b e d c o d e ( e m b e d c o d e , a p i _ k e y , a p i _ s e c r e t , t i m e , J S O N . s t r i n g i f y ( p ) ) ; 
     c o n s o l e . l o g ( ' f o o ' ) ; 
 } 
 
 f u n c t i o n   s e a r c h E m b e d C o d e ( n a m e K e y ,   m y A r r a y ) { 
         f o r   ( v a r   i = 0 ;   i   <   m y A r r a y . l e n g t h ;   i + + )   { 
                 i f   ( m y A r r a y [ i ] . e m b e d _ c o d e   = = =   n a m e K e y )   { 
                         r e t u r n   m y A r r a y [ i ] ; 
                 } 
         } 
 } 
 
 f u n c t i o n   l o g ( m e s s a g e )   { 
     $ ( ' # o u t p u t ' ) . p r e p e n d ( ' < p > '   +   n e w   D a t e ( ) . t o L o c a l e S t r i n g ( )   +   '   :   '   + m e s s a g e   +   ' < / p > ' ) ; 
 } ; 
 
 
 f u n c t i o n   g e t C u r r e n t C o n f i g ( e m b e d c o d e , a p i _ k e y , a p i _ s e c r e t , e x p i r e s ) { 
 	 $ . a j a x ( { 
                 t y p e :   " G E T " , 
                 u r l :   " h t t p s : / / a p i . o o y a l a . c o m / v 2 / a s s e t s / " + e m b e d c o d e + " ? a p i _ k e y = " + a p i _ k e y + " & e x p i r e s = " + e x p i r e s + " & s i g n a t u r e = " + g e t S i g n a t u r e ( a p i _ s e c r e t , a p i _ k e y , " G E T " , 
                 	 " / v 2 / a s s e t s / " + e m b e d c o d e , e x p i r e s , ' ' ) , 
 
                 d a t a T y p e :   " t e x t " , 
                 s u c c e s s :   f u n c t i o n ( d a t a )   { 
                 
                     v a r   e m b e d   =   { } ; 
                     v a r   j s o n   =   J S O N . p a r s e ( d a t a ) ; 
                     c o n s o l e . l o g ( d a t a ) ; 
                     e m b e d [ " e m b e d _ c o d e " ] =   j s o n . e m b e d _ c o d e ; 
                     e m b e d [ " s t r e a m _ u r l s " ]   =   { } ; 
                     e m b e d [ " s t r e a m _ u r l s " ] [ " i p a d " ] = j s o n . s t r e a m _ u r l s . i p a d ; 
                     e m b e d [ " s t r e a m _ u r l s " ] [ " i p h o n e " ] = j s o n . s t r e a m _ u r l s . i p h o n e ; 
                     e m b e d [ " s t r e a m _ u r l s " ] [ " f l a s h " ] = j s o n . s t r e a m _ u r l s . f l a s h ; 
                     e m b e d [ " s t r e a m _ u r l s " ] [ " s m o o t h " ] = j s o n . s t r e a m _ u r l s . s m o o t h ; 
                     e m b e d [ " d e s c r i p t i o n " ] = j s o n . d e s c r i p t i o n ; 
                 	 
                     c o n f i g u r e d _ e m b e d c o d e s [ " a s s e t s " ] . p u s h ( e m b e d ) ; 
                     j s o n d a t a = J S O N . s t r i n g i f y ( c o n f i g u r e d _ e m b e d c o d e s ) ; 
                 	 c o n s o l e . l o g ( j s o n d a t a ) ; 
                   
                     l o g ( J S O N . s t r i n g i f y ( d a t a , u n d e f i n e d ,   2 ) ) ; 
                     l o g ( " s u c c e s s f u l l y   q u e r i e d " ) ; 
                 } , 
                 e r r o r :   f u n c t i o n   ( d a t a ,   t e x t S t a t u s ,   e r r o r T h r o w n )   { 
                 	   l o g ( J S O N . s t r i n g i f y ( d a t a , u n d e f i n e d ,   2 ) ) ; 
                       l o g ( " e r r o r   g e t t i n g   i n f o   a b o u t   t h e   a s s e t " ) ; 
                 } 
                 } ) ; 
 } 
 
 
 f u n c t i o n   g e t C o n f i g ( e m b e d c o d e , a p i _ k e y , a p i _ s e c r e t , e x p i r e s ) { 
   
 } 
 
 f u n c t i o n   u p d a t e _ e m b e d c o d e ( e m b e d c o d e , a p i _ k e y , a p i _ s e c r e t , e x p i r e s , j s o n ) { 
 $ . a j a x ( { 
                 t y p e :   " P A T C H " , 
                 u r l :   " h t t p s : / / a p i . o o y a l a . c o m / v 2 / a s s e t s / " + e m b e d c o d e + " ? a p i _ k e y = " + a p i _ k e y + " & e x p i r e s = " + e x p i r e s + " & s i g n a t u r e = " + g e t S i g n a t u r e ( a p i _ s e c r e t , a p i _ k e y , " P A T C H " , 
                     " / v 2 / a s s e t s / " + e m b e d c o d e , e x p i r e s , j s o n ) , 
                 d a t a :   j s o n , 
                 d a t a T y p e :   " t e x t " , 
                 s u c c e s s :   f u n c t i o n ( d a t a ) { 
                       c o n s o l e . l o g ( " u p d a t e d   s u c c e s s f u l l y " + d a t a ) ; 
                   
                       l o g ( J S O N . s t r i n g i f y ( d a t a , u n d e f i n e d ,   2 ) ) ; 
                       l o g ( " s u c c e s s f u l l y   u p d a t e d " ) ; 
                 } , 
                 e r r o r :   f u n c t i o n   ( d a t a ,   t e x t S t a t u s ,   e r r o r T h r o w n )   { 
                     c o n s o l e . l o g ( d a t a ) ; 
                     l o g ( J S O N . s t r i n g i f y ( d a t a , u n d e f i n e d ,   2 ) ) ; 
                     l o g ( " e r r o r   u p d a t i n g   t h e   a s s e t " ) ; 
                 } 
                 } ) ; 
 } 
 
 f u n c t i o n   s y n t a x H i g h l i g h t ( j s o n )   { 
         i f   ( t y p e o f   j s o n   ! =   ' s t r i n g ' )   { 
                   j s o n   =   J S O N . s t r i n g i f y ( j s o n ,   u n d e f i n e d ,   2 ) ; 
         } 
         j s o n   =   j s o n . r e p l a c e ( / & / g ,   ' & a m p ; ' ) . r e p l a c e ( / < / g ,   ' & l t ; ' ) . r e p l a c e ( / > / g ,   ' & g t ; ' ) ; 
         r e t u r n   j s o n . r e p l a c e ( / ( " ( \ \ u [ a - z A - Z 0 - 9 ] { 4 } | \ \ [ ^ u ] | [ ^ \ \ " ] ) * " ( \ s * : ) ? | \ b ( t r u e | f a l s e | n u l l ) \ b | - ? \ d + ( ? : \ . \ d * ) ? ( ? : [ e E ] [ + \ - ] ? \ d + ) ? ) / g ,   f u n c t i o n   ( m a t c h )   { 
                 v a r   c l s   =   ' n u m b e r ' ; 
                 i f   ( / ^ " / . t e s t ( m a t c h ) )   { 
                         i f   ( / : $ / . t e s t ( m a t c h ) )   { 
                                 c l s   =   ' k e y ' ; 
                         }   e l s e   { 
                                 c l s   =   ' s t r i n g ' ; 
                         } 
                 }   e l s e   i f   ( / t r u e | f a l s e / . t e s t ( m a t c h ) )   { 
                         c l s   =   ' b o o l e a n ' ; 
                 }   e l s e   i f   ( / n u l l / . t e s t ( m a t c h ) )   { 
                         c l s   =   ' n u l l ' ; 
                 } 
                 r e t u r n   ' < s p a n   c l a s s = " '   +   c l s   +   ' " > '   +   m a t c h   +   ' < / s p a n > ' ; 
         } ) ; 
 } 
 
 f u n c t i o n   S y n c ( ) { 
     u p d a t e A P I K e y s ( ) ; 
 
     c o n f i g u r e d _ e m b e d c o d e s [ " a s s e t s " ] = [ ] ; 
 
 
 
     f o r   ( v a r   i   =   c o n f i g . a s s e t s . l e n g t h   -   1 ;   i   > =   0 ;   i - - )   { 
             v a r   t i m e   =   M a t h . f l o o r ( D a t e . n o w ( )   /   1 0 0 0 )   + 3 0 0 ; 
             g e t C u r r e n t C o n f i g ( c o n f i g . a s s e t s [ i ] . e m b e d _ c o d e , a p i _ k e y , a p i _ s e c r e t , t i m e ) ; 
     } ; 
 
 } 
 
 f u n c t i o n   D o w n l o a d ( ) { 
             v a r   p o m   =   d o c u m e n t . c r e a t e E l e m e n t ( ' a ' ) ; 
         p o m . s e t A t t r i b u t e ( ' h r e f ' ,   ' d a t a : t e x t / p l a i n ; c h a r s e t = u t f - 8 , '   +   e n c o d e U R I C o m p o n e n t ( J S O N . s t r i n g i f y ( c o n f i g u r e d _ e m b e d c o d e s ) , n u l l , 2 ) ) ; 
         p o m . s e t A t t r i b u t e ( ' d o w n l o a d ' ,   " o o y a l a - c o n f i g . j s o n " ) ; 
 
         i f   ( d o c u m e n t . c r e a t e E v e n t )   { 
                 v a r   e v e n t   =   d o c u m e n t . c r e a t e E v e n t ( ' M o u s e E v e n t s ' ) ; 
                 e v e n t . i n i t E v e n t ( ' c l i c k ' ,   t r u e ,   t r u e ) ; 
                 p o m . d i s p a t c h E v e n t ( e v e n t ) ; 
         } 
         e l s e   { 
                 p o m . c l i c k ( ) ; 
         } 
 
 
 } 
 
 f u n c t i o n   r e n d e r T a b l e ( c o n f i g ) { 
 
     $ ( ' # r e s u l t s t a b l e ' ) . e m p t y ( ) ; 
                   v a r   h t m l = ' ' ;     
                   f o r   ( i   =   0 ;   i   <   c o n f i g . c h a n n e l s . l e n g t h ;   i + + )   {   
                       h t m l   + =   ' < t r > < t d > < p   c l a s s = " t e x t - l e f t " > ' + c o n f i g . c h a n n e l s [ i ] . c h a n n e l _ n a m e + ' < / p > < / t d > '   + 
                       ' < t d > < p   c l a s s = " t e x t - l e f t " > ' + c o n f i g . c h a n n e l s [ i ] . e m b e d _ c o d e + ' < / p > < / t d > ' + 
                       ' < t d > < b u t t o n   o n c l i c k = " I m p l e m e n t C h a n g e ( \ ' ' + c o n f i g . c h a n n e l s [ i ] . e m b e d _ c o d e + ' \ ' ) ; "   t y p e = " c h e c k b o x "   c l a s s = " b t n   b t n - d e f a u l t   b t n - l g " > < s p a n   c l a s s = " g l y p h i c o n   g l y p h i c o n - e d i t "   a r i a - h i d d e n = " t r u e " > < / s p a n > < / b u t t o n > < / t d > ' + 
                       ' < t d > < b u t t o n   o n c l i c k = " i n f o c l i c k ( \ ' ' + c o n f i g . c h a n n e l s [ i ] . e m b e d _ c o d e + ' \ ' ) ; "   t y p e = " c h e c k b o x "   c l a s s = " b t n   b t n - d e f a u l t   b t n - l g " > < s p a n   c l a s s = " g l y p h i c o n   g l y p h i c o n - i n f o - s i g n "   a r i a - h i d d e n = " t r u e " > < / s p a n > < / b u t t o n > < / t d > ' + 
                       ' < / t r > ' 
                 } 
                   $ ( " # o o y a l a - a p i - k e y " ) . v a l ( c o n f i g . o o y a l a _ a p i _ k e y ) ; 
                   $ ( " # o o y a l a - a p i - s e c r e t " ) . v a l ( c o n f i g . o o y a l a _ a p i _ s e c r e t ) ; 
                   $ ( ' # r e s u l t s t a b l e ' ) . a p p e n d ( h t m l ) ; 
 
 } 
 
 f u n c t i o n   h a n d l e F i l e S e l e c t ( e v t )   { 
         v a r   f i l e s   =   e v t . t a r g e t . f i l e s ;   / /   F i l e L i s t   o b j e c t 
           f   =   f i l e s [ 0 ] ; 
             v a r   r e a d e r   =   n e w   F i l e R e a d e r ( ) ; 
 
             / /   C l o s u r e   t o   c a p t u r e   t h e   f i l e   i n f o r m a t i o n . 
             r e a d e r . o n l o a d   =   ( f u n c t i o n ( t h e F i l e )   { 
                 r e t u r n   f u n c t i o n ( e )   { 
                     / /   R e n d e r   t h u m b n a i l . 
                   J s o n O b j   =   e . t a r g e t . r e s u l t 
                   c o n f i g = J S O N . p a r s e ( J s o n O b j ) ; 
                   r e n d e r T a b l e ( c o n f i g ) ; 
       
 
 	 	 
 	 
           	         
                 } ; 
             } ) ( f ) ; 
 
             / /   R e a d   i n   t h e   i m a g e   f i l e   a s   a   d a t a   U R L . 
             r e a d e r . r e a d A s T e x t ( f ) ; 	 	 
 } 
 
 f u n c t i o n   g e t S i g n a t u r e ( s e c r e t ,   a p i _ k e y , h t t p _ m e t h o d ,   r e q u e s t _ p a t h ,   e x p i r e s ,   r e q u e s t _ b o d y ) { 
 	 v a r   m e t h o d   =   m e t h o d   | |   ' G E T ' ; 
 	 c o n s o l e . l o g ( m e t h o d ) ; 
 	 v a r   s t r i n g _ t o _ s i g n   =   s e c r e t   +   h t t p _ m e t h o d   +   r e q u e s t _ p a t h   +   ' a p i _ k e y = ' + a p i _ k e y +   ' e x p i r e s = ' + e x p i r e s + r e q u e s t _ b o d y ; 
 	 c o n s o l e . l o g ( " b e f o r e   s i g n : " + s t r i n g _ t o _ s i g n ) 
 	 v a r   s h a O b j   =   n e w   j s S H A ( " S H A - 2 5 6 " ,   " T E X T " ) ; 
 	 s h a O b j . u p d a t e ( s t r i n g _ t o _ s i g n ) ; 
 	 v a r   h a s h   =   s h a O b j . g e t H a s h ( " B 6 4 " ) ; 
         v a r   s i g n a t u r e   =   e n c o d e U R I C o m p o n e n t ( h a s h . s u b s t r ( 0 , 4 3 ) . r e p l a c e ( / = * $ / , ' ' ) ) ; 
         c o n s o l e . l o g ( " a f t e r   s i g n : " + s i g n a t u r e ) ; 
         r e t u r n   s i g n a t u r e ; 	 
 } 
 
 f u n c t i o n   i n f o c l i c k ( e m b e d c o d e ) { 
     v a r   t i m e   =   M a t h . f l o o r ( D a t e . n o w ( )   /   1 0 0 0 )   + 3 0 0 ; 
     u p d a t e A P I K e y s ( ) ; 
       $ . a j a x ( { 
                 t y p e :   " G E T " , 
                 u r l :   " h t t p s : / / a p i . o o y a l a . c o m / v 2 / a s s e t s / " + e m b e d c o d e + " ? a p i _ k e y = " + a p i _ k e y + " & e x p i r e s = " + t i m e + " & s i g n a t u r e = " + g e t S i g n a t u r e ( a p i _ s e c r e t , a p i _ k e y , " G E T " , 
                     " / v 2 / a s s e t s / " + e m b e d c o d e , t i m e , ' ' ) , 
 
                 d a t a T y p e :   " t e x t " , 
                 s u c c e s s :   f u n c t i o n ( d a t a )   { 
                 
       
                     v a r   j s o n   =   J S O N . p a r s e ( d a t a ) ; 
                     $ ( ' # i n f o t a b l e ' ) . e m p t y ; 
                     $ ( " # m y M o d a l " ) . m o d a l ( ' s h o w ' ) ;         
                     $ ( " # m o d a l h e a d e r " ) . t e x t ( " S t r e a m   U R L   i n f o " ) ;                 / /   i n i t i a l i z e s   a n d   i n v o k e s   s h o w   i m m e d i a t e l y 
                     v a r   h t m l ; 
                     v a r   s   =   s e a r c h E m b e d C o d e ( e m b e d c o d e , c o n f i g . a s s e t s ) 
     h t m l   + =   ' < t r > < t d > < p   c l a s s = " t e x t - l e f t " > e m b e d c o d e < / p > < / t d > < t d > ' + j s o n . e m b e d _ c o d e + ' < / t d > ' + 
         ' < t r > < t d > < p   c l a s s = " t e x t - l e f t " > T i t l e < / p > < / t d > < t d > ' + j s o n . n a m e + ' < / t d > ' + 
         ' < t r > < t d > < p   c l a s s = " t e x t - l e f t " > D e s c r i p t i o n < / p > < / t d > < t d > ' + j s o n . d e s c r i p t i o n + ' < / t d > ' + 
         ' < t r > < t d > < p   c l a s s = " t e x t - l e f t " > i p a d   u r l < / p > < / t d > < t d > ' + j s o n . s t r e a m _ u r l s . i p a d + ' < / t d > ' + 
         ' < t r > < t d > < p   c l a s s = " t e x t - l e f t " > i p h o n e   u r l < / p > < / t d > < t d > ' + j s o n . s t r e a m _ u r l s . i p h o n e + ' < / t d > ' + 
         ' < t r > < t d > < p   c l a s s = " t e x t - l e f t " > f l a s h   u r l < / p > < / t d > < t d > ' + j s o n . s t r e a m _ u r l s . f l a s h + ' < / t d > ' + 
         ' < t r > < t d > < p   c l a s s = " t e x t - l e f t " > s m o o t h   u r l < / p > < / t d > < t d > ' + j s o n . s t r e a m _ u r l s . s m o o t h + ' < / t d > ' + 
     ' < / t r > ' ; 
 
     $ ( ' # i n f o t a b l e ' ) . h t m l ( h t m l ) ; 
   l o g ( J S O N . s t r i n g i f y ( d a t a , u n d e f i n e d ,   2 ) ) ; 
                       l o g ( " s u c c e s s f u l l y   q u e r i e d   t h e   a s s e t   i n f o r m a t i o n " ) ; 
 
                 } , 
                 e r r o r :   f u n c t i o n   ( d a t a ,   t e x t S t a t u s ,   e r r o r T h r o w n )   { 
                                       l o g ( J S O N . s t r i n g i f y ( d a t a , u n d e f i n e d ,   2 ) ) ; 
                       l o g ( " e r r o r   g e t t i n g   i n f o   a b o u t   t h e   a s s e t " ) ; 
                 } 
                 } ) ; 
 } 
