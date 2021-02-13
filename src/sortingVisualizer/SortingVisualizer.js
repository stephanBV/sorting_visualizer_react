import React from "react";
import './SortingVisualizer.css';
import { connect } from 'react-redux';
import { doMergeSort } from '../sortingAlgorithms/SortingAlgorithms'
import { doQuickSort } from '../sortingAlgorithms/quickSort'

/* ***** making this component check ig an element of the store has changed ******
links:
https://stackoverflow.com/questions/36557089/how-to-listen-for-specific-property-changes-in-redux-store-after-an-action-is-di
https://stackoverflow.com/questions/36557089/how-to-listen-for-specific-property-changes-in-redux-store-after-an-action-is-di 

*********************************** */

const mapStateToProps = (state) => { // the store is accessible because we added Provider in index.js
    // console.log('SortingViz mapStateToProps:',state.listState);
    return { myStoredList: state.listState };
    
  };

// This is the main color of the array bars.
const INIT_COLOR = 'turquoise';
const COMPARE_COLOR = 'red';
const OVERWRITTE_COLOR = '#8000ff';
const SWAP_COLOR = '#8000ff';
const FINAL_SORTED_COLOR = '#7dff84';
const ANIMATION_SPEED_MS = 25;

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { array: [] };
        // console.log('this.array:', this.state.array);
      }
    /* compare previous list in store to the new actual list generated */
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('prevprops:', prevProps); // -> { myStoredList: Array(..), dispatch: f }
        // console.log('this.props:', this.props);
        if (prevProps.myStoredList !== this.props.myStoredList) {
            // Do whatever you want
            // console.log('previous list:',prevProps.lmyStoredList);
            // console.log('actual list:',this.props.myStoredList);
            this.setState({ array: this.props.myStoredList });
            
        }
    }
    /* ************************************************************ */
//to execute function asynchronously (async + await + new Promise + setTimout), link: https://dev.to/jameseaster/visualizing-merge-sort-3mnc
    async mergeSort() {
        const animations = doMergeSort(this.state.array) 
        let endViz = 0;
        for (let i = 0; i < animations.length; i++) {

            const arrayBars = document.getElementsByClassName('array-bar'); // get the array generated
            const isColorChange = i % 3 !== 2; //if remainder !== 2, then i is one of the two grad-and-color subarrays (not the overwritting one, the 3rd subarray)
            if (isColorChange) { //if True
                //then grab the 2 indices of the subarray
                const [barOneIdx, barTwoIdx] = animations[i]; // [idx list1 of the item that was compared with, item at idx list2]
                // get the style at these two indices
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                // if i is a multiple of 3, change the color (secondary), otherwise let its primary color
                const color = i % 3 === 0 ? COMPARE_COLOR : INIT_COLOR;
                // The conditional (ternary) operator '?' is the only JavaScript operator that takes three operands: 
                // a condition followed by a question mark (?), then an expression to execute if the condition is 
                // truthy followed by a colon (:), and finally the expression to execute if the condition is falsy. 
                // This operator is frequently used as a shortcut for the if statement.
                // link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator#:~:text=The%20conditional%20(ternary)%20operator%20is,if%20the%20condition%20is%20falsy.

                //using a timeout, slowly change the colors of barOne and barTwo
                // setTimeout( () => {
                //     barOneStyle.backgroundColor = color;
                //     barTwoStyle.backgroundColor = color;
                // }, i * ANIMATION_SPEED_MS);
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                endViz++;
                await new Promise((resolve) => setTimeout(resolve, ANIMATION_SPEED_MS));
            } else {
                //meaning if the remainder of i/3 === 2, then i is the subarray used for the overwritting 
                const [barOneIdx, newHeight] = animations[i]; // -> [idx to be overwritten, overwritting value], 
                // setTimeout( () => {
                //     // then get the idx, get the value
                    
                //     // overwritte the old value
                //     // arrayBars[barOneIdx].style.backgroundColor = OVERWRITTE_COLOR;
                //     arrayBars[barOneIdx].style.height = `${newHeight}px`; 
                // }, i * ANIMATION_SPEED_MS);
                arrayBars[barOneIdx].style.backgroundColor = OVERWRITTE_COLOR;
                arrayBars[barOneIdx].style.height = `${newHeight}px`; 
                endViz++;
                await new Promise((resolve) => setTimeout(resolve, ANIMATION_SPEED_MS));
            }
        } 

        if (endViz === animations.length ) {
            this.finalViz();
        }
    }

    async quickSort() {
        const animations = doQuickSort(this.state.array);
        // console.log('sorted:',animations);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar'); 
            const [command, barOneIdx, barTwoIdx] = animations[i];
            console.log(command, barOneIdx, barTwoIdx);
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            console.log('barOneSTyle:', barOneStyle, 'barTwoStyle:', barTwoStyle);
            console.log(typeof command);
            switch(command) {
                case -1:
                  barOneStyle.backgroundColor = COMPARE_COLOR;
                  barTwoStyle.backgroundColor = COMPARE_COLOR;
                  await new Promise((resolve) => setTimeout(resolve, ANIMATION_SPEED_MS));
                //   await new Promise((resolve) => setTimeout(resolve, ANIMATION_SPEED_MS));
                //   break;
                case -2:
                    barOneStyle.backgroundColor = SWAP_COLOR;
                    barTwoStyle.backgroundColor = SWAP_COLOR;
                    const temp = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = temp;
                    await new Promise((resolve) => setTimeout(resolve, ANIMATION_SPEED_MS));
                    // await new Promise((resolve) => setTimeout(resolve, ANIMATION_SPEED_MS));
                //   break;
                case -3:
                    barOneStyle.backgroundColor = INIT_COLOR;
                    barTwoStyle.backgroundColor = INIT_COLOR;
                    await new Promise((resolve) => setTimeout(resolve, ANIMATION_SPEED_MS));
                    // await new Promise((resolve) => setTimeout(resolve, ANIMATION_SPEED_MS));
                    // break
                // default:
                  // code block
              }
              if (i === animations.length-1 ) {
                this.finalViz();
            }
        }
    }

//finally, color the sorted list in green
  async finalViz() {
      console.log('in final viz');
        const arrayBars = document.getElementsByClassName('array-bar');
            for (let f=0; f<arrayBars.length; f++) {
                // setTimeout( () => {
                //     const barStyle = arrayBars[f].style;
                //     barStyle.backgroundColor = FINAL_SORTED_COLOR;
                // }, f * ANIMATION_SPEED_MS * 2);
                const barStyle = arrayBars[f].style;
                barStyle.backgroundColor = FINAL_SORTED_COLOR;
                await new Promise((resolve) => setTimeout(resolve, ANIMATION_SPEED_MS));
            } 
   }; 
    
    render() {
        return <div className='array-container'>
            {this.state.array.map((value, idx) => (
                <div
                className="array-bar"
                key={idx}
                style={{
                    backgroundColor: INIT_COLOR,
                    height: `${value}px`,
                    width: `${(2/3)*window.innerWidth/this.state.array.length}px`,
                }}></div>
            ))}
            <div className='buttons-container'>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
            </div>
        </div> ;
    }; 
}


export default connect(mapStateToProps)(SortingVisualizer);