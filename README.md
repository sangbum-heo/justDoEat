# justDoEat
just do eat (react-native)
WOW good?!

----- pull -----
git pull justDoEat master
----- push -----
git status

git add .

git commit -m "message"

git push justDoEat master

----------------

현재 RN에서 alert();를 다른 언어들의 print 느낌으로 사용중이다. ( syso )

부모 컴포넌트로부터 받은 prop을 자식 컴포넌트에서 다른 이름으로 setState하게되면
얕은 복사를 하게 되어 같은 곳을 참조하게 된다.
setState를 할 때 값을
~: ~.slice(),
이렇게 하게 되면 깊은 복사를 하게 되어 서로의 값에 영향을 주지 않는다.