import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  expression = ["", "", ""];
  display = "";

  calculate() {
    let result = "";

    if (this.expression[2].length) {
      if (this.expression[1] === " + ") {
        result = `${+this.expression[0] + +this.expression[2]}`;
      } else if (this.expression[1] === " - ") {
        result = `${+this.expression[0] - +this.expression[2]}`;
      } else if (this.expression[1] === " * ") {
        result = `${+this.expression[0] * +this.expression[2]}`;
      } else if (this.expression[1] === " / ") {
        result = `${+this.expression[0] / +this.expression[2]}`;
      }

      this.expression = [result, "", ""];

      this.display = this.expression.join("");
    }
  }

  addCharacter(character: string) {
    if (" + - * / ".includes(character) ? this.display.length < 12 : this.display.length < 15) {
      if (" + - * / ".includes(character) && !this.expression[1].length) {
        this.expression[1] = character;
      } else if (!" + - * / ".includes(character)) {
        if (this.expression[1].length && (character === "." && !this.expression[2].includes(".") || character !== ".")) {
          this.expression[2] += character;
        } else if (character === "." && !this.expression[0].includes(".") || character !== ".") {
          this.expression[0] += character;
        }
      }
    }

    this.display = this.expression.join("");
  }

  removeCharacter() {
    if (this.expression[2].length) {
      this.expression[2] = this.expression[2].split('').slice(0, this.expression[2].length - 1).join('');
    } else if (this.expression[1].length) {
      this.expression[1] = "";
    } else {
      this.expression[0] = this.expression[0].split('').slice(0, this.expression[0].length - 1).join('');
    }

    this.display = this.expression.join("");
  }
}
