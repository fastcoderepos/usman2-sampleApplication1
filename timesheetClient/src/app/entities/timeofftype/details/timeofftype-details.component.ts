import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TimeofftypeService } from '../timeofftype.service';
import { ITimeofftype } from '../itimeofftype';
import { BaseDetailsComponent, Globals, PickerDialogService, ErrorService } from 'src/app/common/shared';
import { GlobalPermissionService } from 'src/app/core/global-permission.service';

@Component({
  selector: 'app-timeofftype-details',
  templateUrl: './timeofftype-details.component.html',
  styleUrls: ['./timeofftype-details.component.scss'],
})
export class TimeofftypeDetailsComponent extends BaseDetailsComponent<ITimeofftype> implements OnInit {
  title = 'Timeofftype';
  parentUrl = 'timeofftype';
  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public global: Globals,
    public timeofftypeService: TimeofftypeService,
    public pickerDialogService: PickerDialogService,
    public errorService: ErrorService,
    public globalPermissionService: GlobalPermissionService
  ) {
    super(formBuilder, router, route, dialog, global, pickerDialogService, timeofftypeService, errorService);
  }

  ngOnInit() {
    this.entityName = 'Timeofftype';
    this.setAssociations();
    super.ngOnInit();
    this.setForm();
    this.getItem();
  }

  setForm() {
    this.itemForm = this.formBuilder.group({
      id: [{ value: '', disabled: true }, Validators.required],
      typename: ['', Validators.required],
    });

    this.fields = [
      {
        name: 'typename',
        label: 'typename',
        isRequired: true,
        isAutoGenerated: false,
        type: 'string',
      },
    ];
  }

  onItemFetched(item: ITimeofftype) {
    this.item = item;
    this.itemForm.patchValue(item);
  }

  setAssociations() {
    this.associations = [
      {
        column: [
          {
            key: 'timeofftypeid',
            value: undefined,
            referencedkey: 'id',
          },
        ],
        isParent: true,
        table: 'timesheetdetails',
        type: 'OneToMany',
        label: 'timesheetdetails',
      },
    ];

    this.childAssociations = this.associations.filter((association) => {
      return association.isParent;
    });

    this.parentAssociations = this.associations.filter((association) => {
      return !association.isParent;
    });
  }

  onSubmit() {
    let timeofftype = this.itemForm.getRawValue();
    super.onSubmit(timeofftype);
  }
}
