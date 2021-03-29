# justDoEat
just do eat (react-native)
use expo-cli

![diagram](https://user-images.githubusercontent.com/72535309/112653123-78061a00-8e91-11eb-84c2-2e2ef8050911.png)
![gui](https://user-images.githubusercontent.com/72535309/112653133-789eb080-8e91-11eb-8a6c-c8ae56c59a2c.png)


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

--------------

Warning
Each child in a list should have a unique "key" prop. 라는 창이 떴다.

<TouchableOpacity onPress={()=>this.openDeleteModal(arr.id)} key={arr.id}>
  <Text>
    {arr.food} {arr.kcal}kcal
  </Text>
</TouchableOpacity>

TouchableOpacity 컴포넌트에 arr.id 라는 키 값을 넣어주니 Warning 이 더이상 발생하지 않았다.

--------------

각 컴포넌트들의 사이즈는 width: '30%', height: '20%' 이런식으로 퍼센테이지로 설정해준다.
절대값(숫자)으로 넣어주면 기기마다 해상도가 달라서 원하는 모양이 안 나올 수 있다.
