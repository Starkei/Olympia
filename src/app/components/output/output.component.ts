import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter
} from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from "@angular/cdk/layout";
import { Output } from "src/app/interfaces/output";
import { Observable } from "rxjs";
import { Filter } from "src/app/interfaces/filter";
import { Filterable } from "src/app/interfaces/filterable";

@Component({
  selector: "app-output",
  templateUrl: "./output.component.html",
  styleUrls: ["./output.component.scss"]
})
export class OutputComponent implements OnInit {
  @Input() service: Filterable;
  @Input() filter: Filter;
  @Input() update: EventEmitter<boolean>;

  items: Observable<Array<Output>>;
  private flexSize: number = 30;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.items = this.service.getFilteredData(this.filter);
    this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
      .subscribe(
        (result: BreakpointState): void => {
          if (result.breakpoints[Breakpoints.Medium]) {
            this.flexSize = 45;
          }
        }
      );
    this.breakpointObserver.observe(["(max-width: 1010px)"]).subscribe(
      (result: BreakpointState): void => {
        if (result.matches) this.flexSize = 100;
      }
    );
    if (this.update) {
      this.update.subscribe(() => {
        this.items = this.service.getFilteredData(this.filter);
      });
    }
  }

  getFormattedFlexSize(): string {
    return this.flexSize + "%";
  }
}
