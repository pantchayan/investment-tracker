const Form = () => {
    return ( 
        <>
            <form>
                <input type="text" placeholder="ENTER ITEM" id="itemInput"></input>
                <input type="text" placeholder="ENTER COST (₹)" id ="priceInput"></input>

                <button type="submit">Add item</button>
            </form>
        </>
     );
}
 
export default Form;