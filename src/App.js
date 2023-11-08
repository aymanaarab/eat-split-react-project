import { useState } from 'react';
import './App.css';
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
function Button({ children, onclick }) {
  return (
    <button className='button' onClick={onclick}> {children}</button>
  )
}
function App() {
  const [friend, setfriends] = useState(initialFriends);
  const [showaddfriend, setsaf] = useState(false);

const [selectedfriend,setselectedfriend]=useState(null);

  function handleselection(friend ) {
   setselectedfriend(curent=> curent?.id ===friend.id ? null : friend);
  setsaf(!showaddfriend)
    // console.log('after the click',selectedfrien)
  }
  
  function handleshowfriend() {
    setsaf((show) => !show)
  }
  function addfriend(friend) {
    setfriends(friends => [...friends, friend]);
    setsaf(!showaddfriend);
    //setsaf((show) => !show)
  }

  return (
    <div className='app'>
      <div className='sidebar'>

        <FriendList friends={friend} Onselection={handleselection} selectedfrien={selectedfriend} />

        {showaddfriend && <FormaddFriend onaddfriend={addfriend}  />}

        <Button onclick={handleshowfriend}>{showaddfriend ? 'Close' : 'Add friend'}</Button>

      </div>

      {selectedfriend && <SplitButton selectedfrien={selectedfriend} />} 
      
    
    </div>
  );
}
function FriendList({ friends, Onselection, selectedfrien }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) =>
        (<Friend friend={friend} key={friend.id} Onselection={Onselection} selectedfrien={selectedfrien} />))
      } </ul>
  )
}
function Friend({ friend, Onselection,selectedfrien}) {
  const isselected= selectedfrien?.id===friend.id;
  return <li className={isselected ? "selected" : ""}>
    <img src={friend.image} alt={friend.name} />
    <h3>{friend.name}</h3>
    {friend.balance < 0 && <p className='red'> You owe {friend.name} $ {Math.abs(friend.balance)} </p>}
    {friend.balance === 0 && <p> You are even with {friend.name}  </p>}
    {friend.balance > 0 && <p className='green'>  {friend.name} owes you $ {Math.abs(friend.balance)}  </p>}
    <Button onclick={() => Onselection(friend) }> {isselected ? 'Close' : 'Select'}</Button>
  {/* I FIXE THE MOTHERFOKKIN ERROR ITS <buttton> is a componenet who has prop onclick not and <button> not an element html normal */}
  </li>
}

function FormaddFriend({ onaddfriend }) {
  function handlesubmit(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID;
    //when we click into submit on the form then we create a new utilisateur 
    // with creating an array new friend that contain name from state image from  state random id and balance that 0
    const newfriend = {
      id,
      name,
      image: `${image} ?=${id}`, // t stick th individual id with the image because the site pravatar stick the id that u give to the image to appeare the same with the username
      balance: 0,
      //crypto.randomUUID => creating a random id
    }
    setName('');
    setimage('');
    onaddfriend(newfriend);
  };

  const [name, setName] = useState('');
  const [image, setimage] = useState('');
  return (
    <form className='form-add-friend' onSubmit={handlesubmit}>
      <label>🙌 Friend name </label>
      <input type='text' value={name} onChange={e => setName(e.target.value)} />

      <label> ✨Image of friend  </label>
      <input type='text' value={image} onChange={e => setimage(e.target.value)} />
      <Button>Add</Button>


    </form>
  )
}
function SplitButton({selectedfrien}) {
  const [bill,setbill]=useState('');
  const [paidByuser,setpaidby]=useState('');
  const paidbyfriend = bill? bill - paidByuser : '';
  const [whoispaying,setwhois]=useState('user');
  return (
    <form className='form-split-bill'>
      <h2> Split a bill with {selectedfrien.name} </h2>
      <label>💰  bill value  </label>
      <input type='text' value={bill} onChange={e=>setbill(Number(e.target.value))} />

      <label>💰  Your  expense  </label>
      <input type='text'  value={paidByuser} onChange={e=>setpaidby(Number(e.target.value)>bill ? paidByuser : Number(e.target.value))} />
      <label>💰  {selectedfrien.name}  expense  </label>
      <input type='text' disabled value={paidbyfriend} />
      <label> Whos paying the bill</label>
      <select  value={whoispaying} onChange={e=>setwhois(e.target.value)}>
        <option value='user'>You</option>
        <option value='friend'> {selectedfrien.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  )
}
export default App;
