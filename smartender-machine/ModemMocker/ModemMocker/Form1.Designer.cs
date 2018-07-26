namespace ModemMocker
{
    partial class Form1
    {
        /// <summary>
        /// Erforderliche Designervariable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Verwendete Ressourcen bereinigen.
        /// </summary>
        /// <param name="disposing">True, wenn verwaltete Ressourcen gelöscht werden sollen; andernfalls False.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Vom Windows Form-Designer generierter Code

        /// <summary>
        /// Erforderliche Methode für die Designerunterstützung.
        /// Der Inhalt der Methode darf nicht mit dem Code-Editor geändert werden.
        /// </summary>
        private void InitializeComponent()
        {
            this.textBoxCOMPort = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.bOpenCOM = new System.Windows.Forms.Button();
            this.groupBoxMain = new System.Windows.Forms.GroupBox();
            this.textBoxSendData = new System.Windows.Forms.TextBox();
            this.textBoxRecievedData = new System.Windows.Forms.TextBox();
            this.buttonSend = new System.Windows.Forms.Button();
            this.labelError = new System.Windows.Forms.Label();
            this.groupBoxMain.SuspendLayout();
            this.SuspendLayout();
            // 
            // textBoxCOMPort
            // 
            this.textBoxCOMPort.Location = new System.Drawing.Point(12, 31);
            this.textBoxCOMPort.Name = "textBoxCOMPort";
            this.textBoxCOMPort.Size = new System.Drawing.Size(100, 20);
            this.textBoxCOMPort.TabIndex = 0;
            this.textBoxCOMPort.Text = "COM";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 15);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(53, 13);
            this.label1.TabIndex = 1;
            this.label1.Text = "COM-Port";
            // 
            // bOpenCOM
            // 
            this.bOpenCOM.Location = new System.Drawing.Point(118, 29);
            this.bOpenCOM.Name = "bOpenCOM";
            this.bOpenCOM.Size = new System.Drawing.Size(75, 23);
            this.bOpenCOM.TabIndex = 2;
            this.bOpenCOM.Text = "Open";
            this.bOpenCOM.UseVisualStyleBackColor = true;
            this.bOpenCOM.Click += new System.EventHandler(this.bOpenCOM_Click);
            // 
            // groupBoxMain
            // 
            this.groupBoxMain.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.groupBoxMain.Controls.Add(this.labelError);
            this.groupBoxMain.Controls.Add(this.buttonSend);
            this.groupBoxMain.Controls.Add(this.textBoxRecievedData);
            this.groupBoxMain.Controls.Add(this.textBoxSendData);
            this.groupBoxMain.Enabled = false;
            this.groupBoxMain.Location = new System.Drawing.Point(12, 58);
            this.groupBoxMain.Name = "groupBoxMain";
            this.groupBoxMain.Size = new System.Drawing.Size(554, 358);
            this.groupBoxMain.TabIndex = 3;
            this.groupBoxMain.TabStop = false;
            this.groupBoxMain.Text = "Main";
            // 
            // textBoxSendData
            // 
            this.textBoxSendData.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textBoxSendData.Location = new System.Drawing.Point(6, 19);
            this.textBoxSendData.Name = "textBoxSendData";
            this.textBoxSendData.Size = new System.Drawing.Size(461, 20);
            this.textBoxSendData.TabIndex = 0;
            // 
            // textBoxRecievedData
            // 
            this.textBoxRecievedData.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textBoxRecievedData.Location = new System.Drawing.Point(6, 88);
            this.textBoxRecievedData.Multiline = true;
            this.textBoxRecievedData.Name = "textBoxRecievedData";
            this.textBoxRecievedData.Size = new System.Drawing.Size(542, 264);
            this.textBoxRecievedData.TabIndex = 1;
            // 
            // buttonSend
            // 
            this.buttonSend.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonSend.Location = new System.Drawing.Point(473, 17);
            this.buttonSend.Name = "buttonSend";
            this.buttonSend.Size = new System.Drawing.Size(75, 23);
            this.buttonSend.TabIndex = 2;
            this.buttonSend.Text = "Send";
            this.buttonSend.UseVisualStyleBackColor = true;
            this.buttonSend.Click += new System.EventHandler(this.buttonSend_Click);
            // 
            // labelError
            // 
            this.labelError.AutoSize = true;
            this.labelError.ForeColor = System.Drawing.Color.Red;
            this.labelError.Location = new System.Drawing.Point(6, 42);
            this.labelError.Name = "labelError";
            this.labelError.Size = new System.Drawing.Size(28, 13);
            this.labelError.TabIndex = 3;
            this.labelError.Text = "error";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(578, 428);
            this.Controls.Add(this.groupBoxMain);
            this.Controls.Add(this.bOpenCOM);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.textBoxCOMPort);
            this.Name = "Form1";
            this.Text = "Form1";
            this.groupBoxMain.ResumeLayout(false);
            this.groupBoxMain.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox textBoxCOMPort;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button bOpenCOM;
        private System.Windows.Forms.GroupBox groupBoxMain;
        private System.Windows.Forms.Button buttonSend;
        private System.Windows.Forms.TextBox textBoxRecievedData;
        private System.Windows.Forms.TextBox textBoxSendData;
        private System.Windows.Forms.Label labelError;
    }
}

